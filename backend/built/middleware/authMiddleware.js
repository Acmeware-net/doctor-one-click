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
exports.protectPatient = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    console.log(`Entering protect method inside auth middleware`);
    token = req.cookies.jwt;
    console.log(`token : ${token}`);
    if (token) {
        try {
            const jwtSecret = process.env.JWT_SECRET;
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            console.log(`decoded token : ${decoded}`);
            const userId = decoded.userId;
            console.log(`user id: ${userId}`);
            req.user = yield userModel_js_1.default.findById(userId).select('-password');
            console.log(`request user is ${req.user}`);
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}));
exports.protect = protect;
const protectPatient = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const jwtSecret = process.env.JWT_SECRET;
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            const userId = decoded.userId;
            req.user = yield userModel_js_1.default.findById(userId).select('-password');
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}));
exports.protectPatient = protectPatient;
