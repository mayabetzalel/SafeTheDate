import { RequestHandler } from "express";
import { Jwt, JwtPayload, TokenExpiredError, verify, sign } from "jsonwebtoken";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "../constants";
import appLogger from "../lib/app-logger";
import {
  FunctionalityError,
  retServerError,
  serverErrorCodes,
} from "../utils/error";
import { ILogger } from "../utils/logger";
import { AccessTokenPayload, HttpStatus } from "../utils/types";


export function verifyJWTToken(
  token: string,
  secret: string,
  options: Parameters<typeof verify>[2]
): Promise<string | Jwt | JwtPayload> {
  return new Promise((resolve, reject) => {
    verify(token, secret, options, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      resolve(decodedToken);
    });
  });
}

export const useAuthorizationParser: (logger?: ILogger) => RequestHandler =
  (logger: ILogger = appLogger()) =>
  async (req, res, next) => {
    
    console.log(req.cookies)
    const authToken = (req.cookies ?? {})[REFRESH_TOKEN_COOKIE_NAME];

    if (!authToken) {
      logger.error(
        new FunctionalityError(
          serverErrorCodes.MissingBearerToken,
          [],
          HttpStatus.FORBIDDEN
        )
      );
      return next();
    }

    // If bearer token has been sent, send to client if its invalid or expired
    verifyJWTToken(authToken, process.env.REFRESH_TOKEN_SECRET ?? "", {})
      .then((jwtPayload) => {
        req.user = jwtPayload as AccessTokenPayload;
        return next();
      })
      .catch((e) => {
        logger.error(e);
        return next();
      });
  };


export const createToken = (userId: string, userEmail: string) => {
  const token: string = sign(
  { user_id: userId, userEmail }, 
  process.env.ACCESS_TOKEN_SECRET as string,
  {
    expiresIn: process.env.JWT_EXPIRATION,
  })
  return token
};

export const useAuth: RequestHandler = (req, res, next) => {
  if (!req.user || !req.user.username) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json(retServerError(serverErrorCodes.UserIsMissing));
  }

  return next();
};
