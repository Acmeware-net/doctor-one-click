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
exports.restoreUser = exports.disableUser = exports.updateUserProfile = exports.getUserProfile = exports.logoutUser = exports.registerUser = exports.authUser = void 0;
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
        console.log(`user type : ${user.type}`);
        let doctor = null;
        let patient = null;
        let userId = user._id;
        if ((user === null || user === void 0 ? void 0 : user.type) === 'patient') {
            patient = yield patientModel_js_1.default.findOne({ userId });
        }
        if ((user === null || user === void 0 ? void 0 : user.type) === 'doctor') {
            doctor = yield doctorModel_js_1.default.findOne({ userId });
        }
        if (doctor) {
            res.json({
                name: doctor.name,
                email: doctor.email,
                dateofbirth: doctor.dateofbirth,
                gender: doctor.gender,
                phone: doctor.phone,
                address: doctor.address,
                city: doctor.city,
                state: doctor.state,
                zipcode: doctor.zipcode,
                username: user.username,
                type: user.type,
                experience: doctor.experience,
                specialization: doctor.specialization,
                bio: doctor.bio,
                headline: doctor.headline,
                license: doctor.license,
            });
        }
        if (patient) {
            res.json({
                name: patient.name,
                username: user.username,
                email: patient.email,
                dateofbirth: patient.dateofbirth,
                gender: patient.gender,
                phone: patient.phone,
                address: patient.address,
                city: patient.city,
                state: patient.state,
                zipcode: patient.zipcode,
                type: user.type,
            });
        }
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
    const { email, password, doctor, username } = req.body;
    // const { name, email, password, dateofbirth, gender, phone, address, city, state, zipcode, type,} = req.body;
    console.log(`User comes to register with username: ${username} and email ${email} and password: ${password} and doctor ${doctor} `);
    const userExists = yield userModel_js_1.default.findOne({ email });
    console.log(`user exists? ${userExists}`);
    if (userExists) {
        res.status(400).json({ message: 'User already exists with this email.' });
        // throw new Error('User already exists with this email.');
    }
    const usernameExists = yield userModel_js_1.default.findOne({ username });
    console.log(`username exists? ${usernameExists}`);
    if (usernameExists) {
        res.status(400).json({ message: 'User already exists with this email.' });
        // throw new Error('User already exists with this username.');
    }
    let type = "";
    doctor ? type = "doctor" : type = "patient";
    const user = yield userModel_js_1.default.create({
        username,
        email,
        password,
        type,
    });
    const userId = user.id;
    let newUser = null;
    let name = email.split('@')[0];
    console.log(`New user has come to register with username: ${username}`);
    console.log(`New user registered with id ${user.id}`);
    let status = 'Online';
    if (!doctor) {
        console.log("inside Patient block");
        newUser = yield patientModel_js_1.default.create({
            userId,
            name,
            email,
            status,
        });
    }
    else {
        console.log("inside Doctor block");
        newUser = yield doctorModel_js_1.default.create({
            userId,
            name,
            status,
            email
        });
    }
    console.log(`newUser is ${newUser}`);
    if (user) {
        (0, generateToken_js_1.default)(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            name: newUser.name,
            email: user.email,
            dateofbirth: newUser.dateofbirth,
            gender: newUser.gender,
            phone: newUser.phone,
            address: newUser.address,
            city: newUser.city,
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
    console.log(`logout runs, request is ${req.body}`);
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
            // city: user.city,
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
    const { _id, username, name, email, password, phone, address, gender, dateofbirth, city, state, zipcode, experience, specialization, bio, headline, status, image, license } = req.body;
    const usernameExists = yield userModel_js_1.default.findOne({ username });
    console.log(`username exists? ${usernameExists}`);
    if (usernameExists) {
        res.status(400);
        throw new Error('Username already exists. Please choose another username.');
    }
    const user = yield userModel_js_1.default.findById(req.user._id);
    if (user) {
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.username;
        if (req.body.password) {
            user.password = req.body.password;
        }
        yield user.save();
        const userId = req.user._id;
        let doctor = null;
        let patient = null;
        if ((user === null || user === void 0 ? void 0 : user.type) === 'patient') {
            console.log(`user type is patient`);
            patient = yield patientModel_js_1.default.findOne({ userId });
            if (patient) {
                patient.name = req.body.name || patient.name;
                patient.email = req.body.email || patient.email;
                patient.dateofbirth = req.body.dateofbirth || patient.dateofbirth;
                patient.gender = req.body.gender || patient.gender;
                patient.phone = req.body.phone || patient.phone;
                patient.address = req.body.address || patient.address;
                patient.city = req.body.city || patient.city;
                patient.state = req.body.state || patient.state;
                patient.zipcode = req.body.zipcode || patient.zipcode;
                patient.status = req.body.status || patient.status;
                patient.image = req.body.image || patient.image;
                patient.save();
            }
            console.log(`patient is ${patient}`);
        }
        if ((user === null || user === void 0 ? void 0 : user.type) === 'doctor') {
            console.log(`user type is doctor`);
            doctor = yield doctorModel_js_1.default.findOne({ userId });
            if (doctor) {
                doctor.name = req.body.name || doctor.name;
                doctor.email = req.body.email || doctor.email;
                doctor.dateofbirth = req.body.dateofbirth || doctor.dateofbirth;
                doctor.gender = req.body.gender || doctor.gender;
                doctor.phone = req.body.phone || doctor.phone;
                doctor.address = req.body.address || doctor.address;
                doctor.city = req.body.city || doctor.city;
                doctor.state = req.body.state || doctor.state;
                doctor.zipcode = req.body.zipcode || doctor.zipcode;
                doctor.status = req.body.status || doctor.status;
                doctor.experience = req.body.experience || doctor.experience;
                doctor.specialization = req.body.specialization || doctor.specialization;
                doctor.bio = req.body.bio || doctor.bio;
                doctor.headline = req.body.headline || doctor.headline;
                doctor.license = req.body.license || doctor.license;
                doctor.image = req.body.image || doctor.image;
                doctor.save();
            }
            console.log(`doctor is ${doctor}`);
        }
        console.log(`user to update is ${user}`);
        if (doctor) {
            res.json({
                name: doctor.name,
                username: user.username,
                email: doctor.email,
                dateofbirth: doctor.dateofbirth,
                gender: doctor.gender,
                phone: doctor.phone,
                address: doctor.address,
                city: doctor.city,
                state: doctor.state,
                zipcode: doctor.zipcode,
                type: user.type,
                experience: doctor.experience,
                specialization: doctor.specialization,
                bio: doctor.bio,
                headline: doctor.headline,
                license: doctor.license,
                status: doctor.status,
                image: doctor.image,
            });
        }
        if (patient) {
            res.json({
                name: patient.name,
                username: user.username,
                email: patient.email,
                dateofbirth: patient.dateofbirth,
                gender: patient.gender,
                phone: patient.phone,
                address: patient.address,
                city: patient.city,
                state: patient.state,
                zipcode: patient.zipcode,
                status: patient.status,
                type: user.type,
                image: patient.image,
            });
        }
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.updateUserProfile = updateUserProfile;
// @desc    Delete/Disable user by id
// @route   DELETE /api/users/:id
// @access  Private
const disableUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('inside disable/delete a user by id controller method');
    const id = req.user._id;
    console.log(`user id: ${id}`);
    const user = yield userModel_js_1.default.findById(id);
    if (user) {
        user.enabled = false;
        user.save();
        res.status(200).json({ "message": "User account pending for deletion." });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.disableUser = disableUser;
// @desc    Restore user by id
// @route   POST /api/users/:id
// @access  Private
const restoreUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('inside restore a user by id controller method');
    const id = req.user._id;
    console.log(`user id: ${id}`);
    const user = yield userModel_js_1.default.findById(id);
    if (user) {
        user.enabled = true;
        user.save();
        res.status(200).json({ "message": "User account is restored.", user: user });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.restoreUser = restoreUser;
