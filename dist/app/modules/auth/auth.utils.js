"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashing = yield bcrypt_1.default
        .hash(password, parseInt(config_1.default.bycrypt_salt_rounds))
        .then(function (hash) {
        return hash;
    })
        .catch(err => {
        throw new ApiError_1.default(401, err);
    });
    return hashing;
});
exports.hashPassword = hashPassword;
const decryptPassword = ({ userPassword, storedPassword, }) => __awaiter(void 0, void 0, void 0, function* () {
    const compare = yield bcrypt_1.default
        .compare(userPassword, storedPassword)
        .then(function (result) {
        return result;
    })
        .catch(err => {
        throw new ApiError_1.default(401, err);
    });
    return compare;
});
exports.decryptPassword = decryptPassword;
