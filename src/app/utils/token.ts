import { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVars } from "../config/env";
import { jwtUtils } from "./jwt";
import { cookieUtils } from "./cookie";
import { Response } from "express";
import ms, { StringValue } from "ms";

const getAccessToken = (payload: JwtPayload) => {
    const accessToken = jwtUtils.createToken(
        payload,
        envVars.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN } as SignOptions
    )
    return accessToken
}

const getRefreshToken = (payload: JwtPayload) => {
    const refreshToken = jwtUtils.createToken(
        payload,
        envVars.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN } as SignOptions
    )
    return refreshToken
}

const setAccessTokenCookie = (res: Response, token: string) => {
    // const maxAge = ms(process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue);
    cookieUtils.setCookie(res, "accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 60 * 24 * 7,
    })
}

const setRefreshTokenCookie = (res: Response, token: string) => {
    // const maxAge = ms(process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue);
    cookieUtils.setCookie(res, "refreshToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 60 * 24,
    })
}

const setBetterAuthSessionCookie = (res: Response, token: string) => {
    // const maxAge = ms(process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue);
    cookieUtils.setCookie(res, "better-auth.session_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 60 * 24 * 7,
    })
}

export const tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setBetterAuthSessionCookie
}