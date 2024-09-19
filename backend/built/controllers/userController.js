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
exports.updateUserProfile = exports.getUserProfile = exports.logoutUser = exports.registerUser = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const doctorModel_js_1 = __importDefault(require("../models/doctorModel.js"));
const patientModel_js_1 = __importDefault(require("../models/patientModel.js"));
const generateToken_js_1 = __importDefault(require("../utils/generateToken.js"));
// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(`auth email is ${email}`);
    const user = yield userModel_js_1.default.findOne({ email });
    // @ts-ignore
    if (user && (yield user.matchPassword(password))) {
        (0, generateToken_js_1.default)(res, user._id);
        res.json({
            _id: user._id,
            // name: user.name,
            email: user.email,
            // dateofbirth: user.dateofbirth,
            // gender: user.gender,
            // phone: user.phone,
            // address: user.address,
            // city: user.address,
            // state: user.state,
            // zipcode: user.zipcode,
            type: user.type,
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
}));
exports.authUser = authUser;
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, doctor } = req.body;
    // const { name, email, password, dateofbirth, gender, phone, address, city, state, zipcode, type,} = req.body;
    console.log(`User comes to register with email ${email} and password: ${password} and doctor ${doctor} `);
    const userExists = yield userModel_js_1.default.findOne({ email });
    console.log(`user exists? ${userExists}`);
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    let type = "";
    doctor ? type = "doctor" : type = "patient";
    const user = yield userModel_js_1.default.create({
        email,
        password,
        type,
    });
    const userId = user.id;
    console.log(`user id is ${user.id}`);
    if (!doctor) {
        console.log("inside isPatient block");
        let name = "patient";
        const patient = yield patientModel_js_1.default.create({
            userId,
            name,
            email
        });
    }
    else {
        console.log("inside isDoctor block");
        let name = "doctor";
        const doctor = yield doctorModel_js_1.default.create({
            userId,
            name,
            email
        });
    }
    if (user) {
        (0, generateToken_js_1.default)(res, user._id);
        res.status(201).json({
            _id: user._id,
            // name: user.name,
            email: user.email,
            // dateofbirth: user.dateofbirth,
            // gender: user.gender,
            // phone: user.phone,
            // address: user.address,
            // city: user.address,
            // state: user.state,
            // zipcode: user.zipcode,
            type: user.type,
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));
exports.registerUser = registerUser;
// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logoutUser = logoutUser;
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`requested user by id: ${req.user._id}`);
    const user = yield userModel_js_1.default.findById(req.user._id);
    if (user) {
        res.json({
            // _id: user._id,
            // name: user.name,
            email: user.email,
            // dateofbirth: user.dateofbirth,
            // gender: user.gender,  
            // phone: user.phone,
            // address: user.address,
            // city: user.address,
            // state: user.state,
            // zipcode: user.zipcode,
            type: user.type,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.getUserProfile = getUserProfile;
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`User comes to update profile, id: ${req.user._id} and name: ${req.user.name} email ${req.user.email} and password : ${req.user.password}`);
    const user = yield userModel_js_1.default.findById(req.user._id);
    if ((user === null || user === void 0 ? void 0 : user.type) === 'patient') {
        console.log(`user type is patient`);
    }
    if ((user === null || user === void 0 ? void 0 : user.type) === 'doctor') {
        console.log(`user type is doctor`);
    }
    console.log(`user to update is ${user}`);
    if (user) {
        // user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        // user.dateofbirth = req.body.dob || user.dateofbirth;
        // user.gender = req.body.gender || user.gender;
        // user.phone = req.body.phone || user.phone;
        // user.address = req.body.address || user.address;
        // user.city = req.body.city || user.city;
        // user.state = req.body.country || user.state;
        // user.zipcode = req.body.zipcode || user.zipcode;
        if (req.body.password) {
            user.password = req.body.password;
        }
        yield user.save();
        const updatedUser = yield user.save();
        res.json({
            // name: updatedUser.name,
            email: updatedUser.email,
            // dateofbirth: updatedUser.dateofbirth,
            // gender: updatedUser.gender,
            // phone: updatedUser.phone,
            // address: updatedUser.address,
            // city: updatedUser.address,
            // country: updatedUser.state,
            // zipcode: updatedUser.zipcode,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.updateUserProfile = updateUserProfile;
