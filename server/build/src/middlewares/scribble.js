"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY1ODMwNTk3MiwiZXhwIjoxNjU4MzA2MDkyfQ.NFdr0kEv31_RXS9lViM7t7cUEI5X4aLO_tmg_PGBHuU';
var decodedToken = jsonwebtoken_1.default.decode(token);
console.log(decodedToken);
