"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const global_error_handler_1 = require("../utils/response/global-error-handler");
const Validation = (schema) => {
    return async (req, res, next) => {
        const errorValidation = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key]) {
                continue;
            }
            const result = await schema[key].safeParseAsync(req[key]);
            if (!result.success) {
                errorValidation.push(result.error.flatten().fieldErrors);
            }
        }
        if (errorValidation.length > 0) {
            throw new global_error_handler_1.AppError(JSON.parse(errorValidation), 400);
        }
        next();
    };
};
exports.Validation = Validation;
//# sourceMappingURL=validation.js.map