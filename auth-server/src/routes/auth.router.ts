import express, { Response } from "express";
import { Types } from "mongoose";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "../constants";
import { ConfirmDTO } from "../dto-types/confirm.req";
import { LoginDTO } from "../dto-types/login.req";
import { RegisterDTO } from "../dto-types/register.req";
import { TokensPack } from "../dto-types/tokensPack";
import { useAuth } from "../middlewares/AuthMiddelwares";
import { useValidateBodyDto } from "../middlewares/useValidation";
import { authService } from "../services/auth.service";
import { FunctionalityError, serverErrorCodes } from "../utils/error";
import { HttpStatus } from "../utils/types";
import { ResetPasswordTokenRequestDTO } from "../dto-types/resetPassToken.req";
import { ResetPasswordRequestDTO } from "../dto-types/resetPassword.req";
const rateLimit = require("express-rate-limit");

// Define the rate limit configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NUMBER_OF_REQUESTS, // Maximum of 5 requests per windowMs
  message: serverErrorCodes.TooManyRequests,
});

function configureTokensCookie(res: Response, tokens: TokensPack) {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
    httpOnly: true,
    path: "/api/auth/token",
    domain: process.env.COOKIE_DOMAIN,
    expires: tokens.refreshExpiryDate,
    sameSite: "strict",
  });

  res.cookie(ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, {
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN,
    maxAge: tokens.expiresIn * 1000,
    sameSite: "strict",
  });
}

const router = express.Router();

router.post("/register", useValidateBodyDto(RegisterDTO), (req, res, next) => {
  authService
    .register(req.body as RegisterDTO)
    .then((errors) => {
      if (errors.length > 0) {
        res.status(HttpStatus.BAD_REQUEST).send(errors);
      } else {
        res.sendStatus(HttpStatus.CREATED);
      }
    })
    .catch(next);
});

router.put(
  "/reset/token",
  limiter,
  useValidateBodyDto(ResetPasswordTokenRequestDTO),
  (req, res, next) => {
    const usernameOrMail: ResetPasswordTokenRequestDTO = req.body;
    authService
      .sendRestoreToken(usernameOrMail.usernameOrMail)
      .then((maskedEmail) => res.status(HttpStatus.ACCEPTED).send(maskedEmail))
      .catch(next);
  }
);

router.put(
  "/reset",
  limiter,
  useValidateBodyDto(ResetPasswordRequestDTO),
  (req, res, next) => {
    authService
      .resetPassword(req.body as ResetPasswordRequestDTO)
      .then((_) => res.sendStatus(HttpStatus.ACCEPTED))
      .catch(next);
  }
);

router.post("/google/login", (req, res, next) => {
  authService
    .loginRegisterWithGoogle(req.body)
    .then((tokens) => {
      configureTokensCookie(res, tokens);
      res.sendStatus(HttpStatus.OK);
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
      res.sendStatus(HttpStatus.OK);
    })
    .catch(next);
});

router.post("/logout", (req, res, next) => {
  if (!req.user?._id) {
    res.sendStatus(HttpStatus.ACCEPTED);
  } else {
    authService
      .logout(req.user!._id)
      .then((_) => {
        res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
        res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
        res.sendStatus(HttpStatus.ACCEPTED);
      })
      .catch(next);
  }
});

router.put("/confirm", useValidateBodyDto(ConfirmDTO), (req, res, next) => {
  authService
    .confirmUser(new Types.ObjectId((req.body as ConfirmDTO).confirmId))
    .then((_) => res.sendStatus(HttpStatus.OK))
    .catch(next);
});

router.get("/session", useAuth, (req, res, next) => {
  res.send(req.user);
});

export default router;
