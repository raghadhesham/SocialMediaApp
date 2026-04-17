"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const config_services_1 = require("./config/config.services");
const global_error_handler_1 = require("./common/utils/response/global-error-handler");
const connectionDB_1 = require("./DB/connectionDB");
const auth_controllers_1 = require("./modules/auth/auth.controllers");
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 3,
    legacyHeaders: false,
    handler: (req, res, next) => {
        throw new global_error_handler_1.AppError(`Too many requests from this IP, please try again after 15 minutes!`, 429);
    },
});
const bootstrap = async () => {
    await (0, connectionDB_1.checkConnectionDb)();
    app.use(express_1.default.json(), (0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(limiter);
    app.use("/auth", auth_controllers_1.authRouter);
    app.get("/", (req, res) => {
        res.status(200).json({ message: "Hi! Welcome to our app!" });
    });
    app.use("{/*demo}", (req, res) => {
        throw new global_error_handler_1.AppError(`Url ${req.originalUrl} with method ${req.method} not found!`, 404);
    });
    app.use(global_error_handler_1.globalErrorHandler);
    app.listen(config_services_1.config.PORT, () => {
        console.log(`Server is running on PORT ${config_services_1.config.PORT}`);
    });
};
exports.default = bootstrap;
//# sourceMappingURL=app.controller.js.map