"use strict";
import passport from "passport";
import { handleErrorServer, handleErrorClient } from "../Handlers/responseHandlers.js";

export function authenticateJWT(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
        return handleErrorServer(res, 500, "Error del servidor durante la autenticación.", err.message);
        }
        if (!user) {
        return handleErrorClient(res, 401, "Acceso denegado. Usuario no autenticado.", info ? info.message : "No se proporcionó usuario.");
        }
        req.user = user;
        next();
    })(req, res, next);
}