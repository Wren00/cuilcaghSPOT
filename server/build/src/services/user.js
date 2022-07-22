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
exports.UserService = void 0;
var prisma_1 = require("../utils/prisma");
var bcrypt_1 = __importDefault(require("bcrypt"));
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users = prisma_1.prisma.users.findMany();
                    return [4 /*yield*/, users];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getUserByName(userName) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users = prisma_1.prisma.users.findMany({
                        where: { user_name: { contains: userName, mode: "insensitive" } },
                    });
                    return [4 /*yield*/, users];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = prisma_1.prisma.users.findUnique({
                        where: { id: userId },
                    });
                    return [4 /*yield*/, user];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getUserByEmail(userEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users = prisma_1.prisma.users.findMany({
                        where: { email_address: { contains: userEmail, mode: "insensitive" } },
                    });
                    return [4 /*yield*/, users];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getUserByLevel(userLevel) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users = prisma_1.prisma.users.findMany({
                        where: { user_level_id: userLevel }
                    });
                    return [4 /*yield*/, users];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//UPDATE function
function updateUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var updateUserName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.users.update({
                        where: {
                            id: user.userId
                        },
                        data: {
                            user_name: user.userName,
                            email_address: user.emailAddress
                        },
                    })];
                case 1:
                    updateUserName = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//CREATE function
function createUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var newProfile, salt, hashedPassword, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(user);
                    return [4 /*yield*/, prisma_1.prisma.user_profiles.create({
                            data: {
                                profile_message: "New User"
                            }
                        })
                        //TODO password hash
                    ];
                case 1:
                    newProfile = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.genSalt()];
                case 2:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(user.userPassword, salt)];
                case 3:
                    hashedPassword = _a.sent();
                    console.log(hashedPassword);
                    return [4 /*yield*/, prisma_1.prisma.users.create({
                            data: {
                                user_name: user.userName,
                                email_address: user.emailAddress,
                                user_password: hashedPassword,
                                trusted_user: false,
                                user_level_id: 2,
                                user_profile_id: newProfile.id
                            },
                        })];
                case 4:
                    newUser = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//DELETE function
//TODO fix delete function
function deleteUserById(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.users.delete({
                        where: {
                            id: userId
                        },
                    })];
                case 1:
                    deletedUser = _a.sent();
                    return [4 /*yield*/, prisma_1.prisma.user_profiles.delete({
                            where: {
                                id: userId
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var UserService = {
    getAllUsers: getAllUsers,
    getUserByName: getUserByName,
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    getUserByLevel: getUserByLevel,
    createUser: createUser,
    updateUser: updateUser,
    deleteUserById: deleteUserById
};
exports.UserService = UserService;