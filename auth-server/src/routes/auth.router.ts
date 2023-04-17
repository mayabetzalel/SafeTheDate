import express, { Response } from "express";
import { Types } from "mongoose";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "../constants";
import { ConfirmDTO } from "../dto-types/confirm.req";
import { LoginDTO } from "../dto-types/login.req";
import { RegisterDTO } from "../dto-types/register.req";
import { TokenRequestDTO } from "../dto-types/token.req";
import { TokensPack } from "../dto-types/tokensPack";
import { useAuth } from "../middlewares/AuthMiddelwares";
import { useValidateBodyDto } from "../middlewares/useValidation";
import { authService } from "../services/auth.service";
import { FunctionalityError, serverErrorCodes } from "../utils/error";
import { HttpStatus } from "../utils/types";

function configureTokensCookie(res: Response, tokens: TokensPack) {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
    httpOnly: true,
    path: "/",
    domain: process.env.COOKIE_DOMAIN,
    expires: tokens.refreshExpiryDate,
    sameSite: "strict",
  });

  res.cookie(ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, {
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN,
    maxAge: tokens.expiresIn * 1000,
    sameSite: "strict",
    path: "/"
  });
}

const router = express.Router();

router.post("/register", useValidateBodyDto(RegisterDTO), (req, res, next) => {
  authService
    .register(req.body as RegisterDTO)
    .then((response) => {
      const errors: any[] = response[0]? [] : response[0]
      const tokens = response[1]
      if (errors.length > 0) {
        res.status(HttpStatus.BAD_REQUEST).send(errors);
      } else {
        configureTokensCookie(res, tokens);
        res.header({ "withCredentials" : true })
        res.header({ "Access-Control-Allow-Credentials": true });
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.sendStatus(HttpStatus.CREATED);
      }
    })
    .catch(next);
});


router.post("/token", (req, res, next) => {
  try {
    const refreshToken = (req.cookies ?? {})[REFRESH_TOKEN_COOKIE_NAME];

    if (!refreshToken) {
      throw new FunctionalityError(
        serverErrorCodes.NoSuchRefreshToken,
        [],
        HttpStatus.FORBIDDEN
      );
    }

    authService
      .regenerateAccessToken(refreshToken)
      .then((tokens) => {
        configureTokensCookie(res, tokens);
        res.sendStatus(HttpStatus.OK);
      })
      .catch(next);
  } catch (e) {
    next(e);
  }
});

router.post("/login", useValidateBodyDto(LoginDTO), (req, res, next) => {
  authService
    .login(req.body)
    .then((tokens) => {
      configureTokensCookie(res, tokens);
      res.header({ "withCredentials" : true })
      res.header({ "Access-Control-Allow-Credentials": true });
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
      
      res.sendStatus(HttpStatus.OK);
    })
    .catch(next);
});

router.post("/logout", (req, res, next) => {
});

router.put("/confirm", useValidateBodyDto(ConfirmDTO), (req, res, next) => {
  authService
    .confirmUser(new Types.ObjectId((req.body as ConfirmDTO).confirmId))
    .then((_) => res.sendStatus(HttpStatus.OK))
    .catch(next);
});


export default router;
