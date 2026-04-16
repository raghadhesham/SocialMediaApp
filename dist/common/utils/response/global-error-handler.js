"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.AppError = void 0;
class AppError extends Error {
    message;
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
const globalErrorHandler = (err, req, res) => {
    const statusCode = err.cause;
    res.status(err.statusCode || 500).json({ message: err.message, statusCode, stack: err.stack });
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=global-error-handler.js.map