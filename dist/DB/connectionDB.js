"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConnectionDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_services_1 = require("../config/config.services");
const checkConnectionDb = async () => {
    try {
        await mongoose_1.default.connect(config_services_1.config.db.MONGODB_URI);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
exports.checkConnectionDb = checkConnectionDb;
//# sourceMappingURL=connectionDB.js.map