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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
var prisma_1 = require("../utils/prisma");
var authentication_1 = require("../constants/authentication");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function userLogin(userName, userPassword) {
    return __awaiter(this, void 0, void 0, function () {
        var user, validPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(userName, userPassword);
                    return [4 /*yield*/, prisma_1.prisma.users.findUnique({
                            where: { user_name: userName },
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 6];
                    return [4 /*yield*/, bcrypt_1.default.compare(userPassword, user.user_password)];
                case 2:
                    validPassword = _a.sent();
                    console.log(validPassword);
                    if (!validPassword) return [3 /*break*/, 4];
                    return [4 /*yield*/, generateTokens(user.id)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: throw Error("Cannot login");
                case 5: return [3 /*break*/, 7];
                case 6: throw Error("Invalid credentials.");
                case 7: return [2 /*return*/];
            }
        });
    });
}
function refresh(bearer) {
    return __awaiter(this, void 0, void 0, function () {
        var token, decodedToken, JSONtoken, otherToken, newToken, id, tokens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Refreshing token: ");
                    token = bearer.substring(7, bearer.length);
                    decodedToken = jsonwebtoken_1.default.decode(token);
                    JSONtoken = JSON.stringify(decodedToken);
                    otherToken = JSONtoken.split(",")[0] + "}";
                    newToken = JSON.parse(otherToken);
                    id = newToken.userId;
                    return [4 /*yield*/, generateTokens(id)];
                case 1:
                    tokens = _a.sent();
                    console.log(tokens);
                    return [2 /*return*/, tokens];
            }
        });
    });
}
function generateTokens(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var checkId, jwtToken, refreshToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.users.findFirst({
                        where: { id: userId },
                    })];
                case 1:
                    checkId = _a.sent();
                    if (checkId) {
                        jwtToken = jsonwebtoken_1.default.sign({ userId: userId }, authentication_1.accessTokenKey, { expiresIn: "120s" });
                        refreshToken = jsonwebtoken_1.default.sign({ userId: userId }, authentication_1.refreshTokenKey, { expiresIn: "2h" });
                        return [2 /*return*/, [jwtToken, refreshToken]];
                    }
                    else {
                        console.log("User doesn't exist");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var AuthenticationService = { userLogin: userLogin, generateTokens: generateTokens, refresh: refresh };
exports.AuthenticationService = AuthenticationService;
