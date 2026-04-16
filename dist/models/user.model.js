"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        min: 3,
        required: true,
    },
    lastName: {
        type: String,
        min: 3,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: [mongoose_1.Types.ObjectId],
        default: [],
    },
    followings: {
        type: [mongoose_1.Types.ObjectId],
        default: [],
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
});
exports.UserSchema.virtual("userName")
    .get(function () {
    return this.firstName + " " + this.lastName;
})
    .set(function (value) {
    this.set({
        firstName: value.split(" ")[0],
        lastName: value.split(" ")[1],
    });
});
const UserModel = mongoose_1.default.model("User", exports.UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map