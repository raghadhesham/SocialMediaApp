"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_services_1 = require("./auth.services");
exports.authRouter = (0, express_1.Router)();
const authService = new auth_services_1.AuthService();
exports.authRouter.post("/signup", authService.signup);
exports.authRouter.post("/signin", authService.signin);
//# sourceMappingURL=auth.controllers.js.map