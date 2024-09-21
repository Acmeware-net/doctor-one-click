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
exports.updateDoctorProfile = exports.getDoctorProfile = exports.logoutDoctor = exports.registerDoctor = exports.getDoctors = exports.authDoctor = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const doctorModel_js_1 = __importDefault(require("../models/doctorModel.js"));
const generateToken_js_1 = __importDefault(require("../utils/generateToken.js"));
const DoctorsResponse_js_1 = require("../responses/DoctorsResponse.js");
// @desc    Auth doctor & get token
// @route   POST /api/doctors/auth
// @access  Public
const authDoctor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(`email is ${email}`);
    const doctor = yield doctorModel_js_1.default.findOne({ email });
    // @ts-ignore
    if (doctor && (yield doctor.matchPassword(password))) {
        (0, generateToken_js_1.default)(res, doctor._id);
        res.json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
}));
exports.authDoctor = authDoctor;
// @desc    Register a new doctor
// @route   POST /api/doctors
// @access  Public
const registerDoctor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, dateofbirth, gender, phone, address, city, state, license, specialization, experience } = req.body;
    console.log(`Doctor comes to login with email ${email}`);
    const doctorExists = yield doctorModel_js_1.default.findOne({ email });
    if (doctorExists) {
        res.status(400);
        throw new Error('Doctor already exists');
    }
    const doctor = yield doctorModel_js_1.default.create({
        name,
        email,
        password,
        dateofbirth,
        gender,
        phone,
        address,
        city,
        state,
        specialization,
        experience,
        license
    });
    if (doctor) {
        (0, generateToken_js_1.default)(res, doctor._id);
        res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            dateofbirth: doctor.dateofbirth,
            gender: doctor.gender,
            phone: doctor.phone,
            address: doctor.address,
            city: doctor.address,
            state: doctor.state,
            specialization: doctor.specialization,
            headline: doctor.headline,
            bio: doctor.bio,
            experience: doctor.experience
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid doctor data');
    }
}));
exports.registerDoctor = registerDoctor;
// @desc    Logout doctor / clear cookie
// @route   POST /api/doctors/logout
// @access  Public
const logoutDoctor = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logoutDoctor = logoutDoctor;
// @desc    Get doctor profile
// @route   GET /api/doctors/profile
// @access  Private
const getDoctorProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield doctorModel_js_1.default.findById(req.doctor._id);
    if (doctor) {
        res.json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            dateofbirth: doctor.dateofbirth,
            gender: doctor.gender,
            phone: doctor.phone,
            address: doctor.address,
            city: doctor.city,
            state: doctor.state,
            specialization: doctor.specialization,
            headline: doctor.headline,
            bio: doctor.bio,
            experience: doctor.experience
        });
    }
    else {
        res.status(404);
        throw new Error('Doctor not found');
    }
}));
exports.getDoctorProfile = getDoctorProfile;
// @desc    Get doctor profile
// @route   GET /api/doctors/
// @access  Public
const getDoctors = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorsList = yield doctorModel_js_1.default.find({});
    if (doctorsList) {
        var doctors = [];
        doctorsList.map((doctor) => { doctors.push((0, DoctorsResponse_js_1.mapper)(doctor)); });
        res.json({ doctors });
    }
    else {
        res.status(404);
        throw new Error('Doctors list not found');
    }
}));
exports.getDoctors = getDoctors;
// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private
const updateDoctorProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield doctorModel_js_1.default.findById(req.doctor._id);
    if (doctor) {
        doctor.name = req.body.name || doctor.name;
        doctor.email = req.body.email || doctor.email;
        doctor.dateofbirth = req.body.dob || doctor.dateofbirth;
        doctor.gender = req.body.gender || doctor.gender;
        doctor.phone = req.body.phone || doctor.phone;
        doctor.address = req.body.address || doctor.address;
        doctor.city = req.body.city || doctor.city;
        doctor.state = req.body.country || doctor.state;
        doctor.specialization = req.body.specialization || doctor.specialization;
        doctor.headline = req.body.headline || doctor.headline;
        doctor.bio = req.body.bio || doctor.bio;
        doctor.experience = req.body.experience || doctor.experience;
        if (req.body.password) {
            // doctor.password = req.body.password;
        }
        const updatedDoctor = yield doctor.save();
        res.json({
            _id: updatedDoctor._id,
            name: updatedDoctor.name,
            email: updatedDoctor.email,
            dob: updatedDoctor.dateofbirth,
            gender: updatedDoctor.gender,
            phone: updatedDoctor.phone,
            address: updatedDoctor.address,
            city: updatedDoctor.address,
            country: updatedDoctor.state,
            specialization: updatedDoctor.specialization,
            headline: updatedDoctor.headline,
            bio: updatedDoctor.bio,
            experience: updatedDoctor.experience
        });
    }
    else {
        res.status(404);
        throw new Error('Doctor not found');
    }
}));
exports.updateDoctorProfile = updateDoctorProfile;
