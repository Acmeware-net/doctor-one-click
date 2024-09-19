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
    let newUser = null;
    console.log(`New user registered with id ${user.id}`);
    if (!doctor) {
        console.log("inside isPatient block");
        let name = "patient";
        newUser = yield patientModel_js_1.default.create({
            userId,
            name,
            email
        });
    }
    else {
        console.log("inside isDoctor block");
        let name = "doctor";
        newUser = yield doctorModel_js_1.default.create({
            userId,
            name,
            email
        });
    }
    console.log(`newUser is ${newUser}`);
    if (user) {
        (0, generateToken_js_1.default)(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: newUser.name,
            email: user.email,
            dateofbirth: newUser.dateofbirth,
            gender: newUser.gender,
            phone: newUser.phone,
            address: newUser.address,
            city: newUser.address,
            state: newUser.state,
            zipcode: newUser.zipcode,
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
    console.log('Entering updateUserProfile method in userController...');
    console.log(req.body);
    const { _id, name, email, password, phone, address, gender, dateofbirth, city, state, zipcode, experience, specialization, bio, headline, image, license } = req.body;
    console.log(`User comes to update profile, id: ${_id} and name: ${name} email ${email} and password : ${password}`);
    console.log(`User comes to update profile, phone: ${phone} and address: ${address} gender ${gender} and city : ${city}`);
    console.log(`User comes to update profile, state: ${state} and zipcode: ${zipcode} experience ${experience} and specialization : ${specialization}`);
    console.log(`User comes to update profile, bio: ${bio} and headline: ${headline} image ${image} and license : ${license}`);
    const user = yield userModel_js_1.default.findById(req.user._id);
    if (user) {
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        yield user.save();
        const userId = req.user._id;
        let updatedUser = null;
        if ((user === null || user === void 0 ? void 0 : user.type) === 'patient') {
            console.log(`user type is patient`);
            updatedUser = yield patientModel_js_1.default.findOne({ userId });
            if (updatedUser) {
                updatedUser.name = req.body.name || updatedUser.name;
                updatedUser.email = req.body.email || updatedUser.email;
                updatedUser.dateofbirth = req.body.dateofbirth || updatedUser.dateofbirth;
                updatedUser.gender = req.body.gender || updatedUser.gender;
                updatedUser.phone = req.body.phone || updatedUser.phone;
                updatedUser.address = req.body.address || updatedUser.address;
                updatedUser.city = req.body.city || updatedUser.city;
                updatedUser.state = req.body.country || updatedUser.state;
                updatedUser.zipcode = req.body.zipcode || updatedUser.zipcode;
                updatedUser.save();
            }
            console.log(`updatedUser is patient ${updatedUser}`);
        }
        if ((user === null || user === void 0 ? void 0 : user.type) === 'doctor') {
            console.log(`user type is doctor`);
            updatedUser = yield doctorModel_js_1.default.findOne({ userId });
            if (updatedUser) {
                updatedUser.name = req.body.name || updatedUser.name;
                updatedUser.email = req.body.email || updatedUser.email;
                updatedUser.dateofbirth = req.body.dateofbirth || updatedUser.dateofbirth;
                updatedUser.gender = req.body.gender || updatedUser.gender;
                updatedUser.phone = req.body.phone || updatedUser.phone;
                updatedUser.address = req.body.address || updatedUser.address;
                updatedUser.city = req.body.city || updatedUser.city;
                updatedUser.state = req.body.country || updatedUser.state;
                updatedUser.zipcode = req.body.zipcode || updatedUser.zipcode;
                updatedUser.experience = req.body.experience || updatedUser.experience;
                updatedUser.specialization = req.body.specialization || updatedUser.specialization;
                updatedUser.bio = req.body.bio || updatedUser.bio;
                updatedUser.headline = req.body.headline || updatedUser.headline;
                updatedUser.license = req.body.license || updatedUser.license;
                updatedUser.save();
            }
            console.log(`updatedUser is doctor ${updatedUser}`);
        }
        console.log(`user to update is ${user}`);
        if (updatedUser) {
            res.json({
                name: updatedUser.name,
                email: updatedUser.email,
                dateofbirth: updatedUser.dateofbirth,
                gender: updatedUser.gender,
                phone: updatedUser.phone,
                address: updatedUser.address,
                city: updatedUser.address,
                country: updatedUser.state,
                zipcode: updatedUser.zipcode,
            });
        }
        else {
            res.json({ message: "User not found." });
        }
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.updateUserProfile = updateUserProfile;
