import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { config } from "./config.js";
import { AuthRequest } from "./types.js";


const userAuthenticate = (req, res, next) => { 
    
    const token = req.header("Authorization");
    if (!token) {
        const err = createHttpError(401, "Authorization token is required ");
        return next(err);
    }

    const parsedToken = token.split(" ")[1];
    if (!parsedToken) {
        const err = createHttpError(401, "Authorization token is required ");
        return next(err);
    }

    const tokenDecode = verify(parsedToken, config.jwrSecret);
    if (!tokenDecode.sub) {
        const err = createHttpError(401, "Invalid Authorization token ");
        return next(err);
    }

    const _req = req;
    _req.userId = tokenDecode.sub;
    next();
};

export default userAuthenticate;