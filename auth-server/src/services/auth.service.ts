import { ConsoleLogger, Events, ILogger } from "../utils/logger";
import {
  AccessTokenPayload,
  FormFieldError,
  HttpStatus,
  IToken,
} from "../utils/types";
import { FunctionalityError, serverErrorCodes } from "../utils/error";
import { RegisterDTO } from "../dto-types/register.req";
import RefreshToken, { IRefreshToken } from "../../mongo/models/RefreshToken";
import UserConfirmation, {
  IUserConfirmation,
} from "../../mongo/models/UserConfirmation";
import { compare, hash } from "bcrypt";
import { LoginDTO } from "src/dto-types/login.req";
import { TokensPack } from "src/dto-types/tokensPack";
import User, { IUser } from "../../mongo/models/User";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { MailSender } from "../utils/mail.utils";
import mongoose from "mongoose";
import { response } from "express";

class AuthService {
  private logger: ILogger;
  private refreshTokenTableIntegrator: typeof RefreshToken;
  private userTableIntegrator: typeof User;
  private userConfirmationTableIntegrator: typeof UserConfirmation;
  constructor(
    logger: ILogger,
    RefreshTokenTableIntegrator: typeof RefreshToken,
    userTableIntegrator: typeof User,
    userConfirmationTableIntegrator: typeof UserConfirmation
  ) {
    this.logger = logger;
    this.refreshTokenTableIntegrator = RefreshTokenTableIntegrator;
    this.userTableIntegrator = userTableIntegrator;
    this.userConfirmationTableIntegrator = userConfirmationTableIntegrator;
  }

  private sendConfirmationMail(
    confirmationId: IUserConfirmation["_id"],
    registeredUserEmail: IUser["email"]
  ) {
    console.log("sendConfirmationMail to " + registeredUserEmail)
    const id = confirmationId.valueOf();
    const url = `${process.env.FRONTEND_ENDPOINT}/user-confirmation?confirmation=${id}`;

    MailSender.getInstance()
      .sendMail({
        to: registeredUserEmail,
        from: process.env.SMTP_AUTH_USER,
        subject: "אישור הרשמה safe the date",
        text: url,
      })
      .then((r) =>
        this.logger.event(Events.CONFIRMATION_EMAIL_SENT, {
          email: registeredUserEmail,
        })
      )
      .catch(this.logger.error);
  }

  async register(
    userToRegister: RegisterDTO
  ) {

    const errors: FormFieldError<RegisterDTO>[] = [];
    
    // Check if email or username already exists
    const dbUser = await this.userTableIntegrator
      .findOne({
        $or: [
          { email: userToRegister.email },
          { username: userToRegister.username },
        ],
      })
      .lean();

    if (dbUser) {
      if (dbUser.email === userToRegister.email) {
        errors.push({
          fieldName: "email",
          message: "Email address already in use, please try another",
        });
      }

      if (dbUser.username === userToRegister.username) {
        errors.push({
          fieldName: "username",
          message: "Username already in use, please try another",
        });
      }
    }

    if (errors.length > 0) {
      return errors;
    }

    // All good, create the user(
    let createdUser: any = null;
    const generatedId = new mongoose.Types.ObjectId();
    const userConfirmation = await this.userConfirmationTableIntegrator.create({
      _id: generatedId,
      user: userToRegister.username,
      email: userToRegister.email,
    }); 

    if (userConfirmation) {
      createdUser = await this.userTableIntegrator.create({
        email: userToRegister.email,
        firstName: userToRegister.firstName,
        lastName: userToRegister.lastName,
        password: await hash(
          userToRegister.password,
          10
        ),
        username: userToRegister.username,
        userConfirmation: userConfirmation._id.valueOf(),
      });
      this.sendConfirmationMail(
        createdUser?.firstName,
        createdUser?.email
      );
    }
    let token: any = ""

    if (!createdUser) {
      throw new FunctionalityError(serverErrorCodes.ServiceUnavilable);
    } 
    // Create access token
    else {
      token = await this.createTokensPack(createdUser)
    }

    return [[], token];
  }

  private verifyTokenExpiration(token: IToken) {
    return token.expiryDate.getTime() > new Date().getTime();
  }

  async regenerateAccessToken(refreshToken: string): Promise<TokensPack> {
    const token = await this.refreshTokenTableIntegrator
      .findOne({
        token: refreshToken,
      })
      .populate("user")
      .lean();

    if (!token || !this.verifyTokenExpiration(token as IToken)) {
      throw new FunctionalityError(serverErrorCodes.NoSuchRefreshToken);
    }
    return this.createTokensPack(token.user);
  }

  async confirmUser(confirmationId: IUserConfirmation["_id"]) {
    const user = await this.userConfirmationTableIntegrator
      .findOne({
        _id: confirmationId,
      })
      .lean();
    if (!user) {
      throw new FunctionalityError(serverErrorCodes.UserIsMissing);
    }
    const updUser = await this.userTableIntegrator.updateOne(
      {
        email: user.email,
      },
      { $set: { isConfirmed: true } }
    );

    if (!updUser){
      throw new FunctionalityError(serverErrorCodes.ServiceUnavilable);
    }

    return updUser;
  }

  async login({ emailOrUsername, password }: LoginDTO): Promise<TokensPack> {
    // Try selecting by email or username
    const user: IUser | null = await this.userTableIntegrator
      .findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      })
      .lean();

    // User does not exist
    if (!user) {
      throw new FunctionalityError(
        serverErrorCodes.UserPasswordIncorrect,
        [],
        HttpStatus.FORBIDDEN
      );
    }

    if (!(await compare(password, user.password))) {
      throw new FunctionalityError(
        serverErrorCodes.UserPasswordIncorrect,
        [],
        HttpStatus.FORBIDDEN
      );
    }

    return this.createTokensPack(user);
  }

  private async createRefreshToken(user: IUser): Promise<IToken> {

    const token = await jwt.sign({'_id': user._id}, process.env.REFRESH_TOKEN_SECRET)
    let experationDate: Date = new Date()
    experationDate.setSeconds(new Date().getSeconds() + +process.env.REFRESH_TOKEN_EXPIRATION)

    console.log(user._id.valueOf());
    
    const result = await this.refreshTokenTableIntegrator.updateOne(
      {
        user: user._id,
      },
      {
        $set: {
          expiryDate: experationDate,
          token: token,
          user: { _id: user._id },
        },
      },
      { upsert: true }
    );
    if (!result) {
      throw new FunctionalityError(serverErrorCodes.ServiceUnavilable);
    }
    return {token,  expiryDate: experationDate};
  }

  private createAccessToken(tokenPayload: AccessTokenPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "";
      const JWT_EXPIRATION = +(process.env.JWT_EXPIRATION ?? 0);

      jwt.sign(
        tokenPayload,
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: JWT_EXPIRATION,
          audience: process.env.JWT_AUDIENCE,
          issuer: process.env.JWT_ISSUER ?? "",
        },
        (err, encoded) => {
          if (err || !encoded) {
            this.logger.error(
              err ?? new Error("sign method did not provide token")
            );
            return reject(err);
          }
          resolve(encoded!);
        }
      );
    });
  }

  logout(userId: IUser["_id"]) {
    return this.refreshTokenTableIntegrator.deleteMany({
      user: userId,
    });
  }

  private async createTokensPack(user: IUser) {
    const { password, ...tokenPayload } = user;
    const refreshToken = await this.createRefreshToken(user);
    const accessToken = await this.createAccessToken(tokenPayload);

    return {
      accessToken: accessToken,
      expiresIn:  +process.env.JWT_EXPIRATION,
      // // Secure: process.env.NODE_ENV === "production",
      // sameSite: "None",
      // httpOnly: true,
      // cookie_samesite:"none",
      refreshExpiryDate: refreshToken.expiryDate,
      refreshToken: refreshToken.token,
    };
  }
}

export const authService = new AuthService(
  ConsoleLogger.getInstance(),
  RefreshToken,
  User,
  UserConfirmation
);
