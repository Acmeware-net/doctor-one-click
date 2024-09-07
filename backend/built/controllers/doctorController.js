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
exports.updateDoctorProfile = exports.getDoctorProfile = exports.logoutDoctor = exports.registerDoctor = exports.authDoctor = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const doctorModel_js_1 = __importDefault(require("../models/doctorModel.js"));
const generateToken_js_1 = __importDefault(require("../utils/generateToken.js"));
// @desc    Auth doctor & get token
// @route   POST /api/doctors/auth
// @access  Public
const authDoctor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const doctor = yield doctorModel_js_1.default.findOne({ email });
    // @ts-ignore
    if (doctor && (yield doctor.matchPassword(password))) {
        (0, generateToken_js_1.default)(res, doctor._id);
        res.json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            age: doctor.age,
            gender: doctor.gender,
            phone: doctor.phone,
            address: doctor.address,
            headline: doctor.headline,
            description: doctor.description,
            specialization: doctor.specialization,
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
    const { name, email, password, age, gender, phone, address, headline, description, specialization } = req.body;
    const doctorExists = yield doctorModel_js_1.default.findOne({ email });
    if (doctorExists) {
        res.status(400);
        throw new Error('doctor already exists');
    }
    const doctor = yield doctorModel_js_1.default.create({
        name,
        email,
        password,
        age,
        gender,
        phone,
        address,
        headline,
        description,
        specialization,
    });
    if (doctor) {
        (0, generateToken_js_1.default)(res, doctor._id);
        res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            age: doctor.age,
            gender: doctor.gender,
            phone: doctor.phone,
            address: doctor.address,
            headline: doctor.headline,
            description: doctor.description,
            specialization: doctor.specialization,
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
            age: doctor.age,
            gender: doctor.gender,
            phone: doctor.phone,
            address: doctor.address,
            headline: doctor.headline,
            description: doctor.description,
            specialization: doctor.specialization,
        });
    }
    else {
        res.status(404);
        throw new Error('doctor not found');
    }
}));
exports.getDoctorProfile = getDoctorProfile;
// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private
const updateDoctorProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield doctorModel_js_1.default.findById(req.doctor._id);
    if (doctor) {
        doctor.name = req.body.name || doctor.name;
        doctor.email = req.body.email || doctor.email;
        doctor.age = req.body.age || doctor.age;
        doctor.gender = req.body.gender || doctor.gender;
        doctor.phone = req.body.phone || doctor.phone;
        doctor.address = req.body.address || doctor.address;
        if (req.body.password) {
            doctor.password = req.body.password;
        }
        const updateddoctor = yield doctor.save();
        res.json({
            _id: updateddoctor._id,
            name: updateddoctor.name,
            email: updateddoctor.email,
            age: updateddoctor.age,
            gender: updateddoctor.gender,
            phone: updateddoctor.phone,
            address: updateddoctor.address,
            headline: updateddoctor.headline,
            description: updateddoctor.description,
            specialization: updateddoctor.specialization,
        });
    }
    else {
        res.status(404);
        throw new Error('doctor not found');
    }
}));
exports.updateDoctorProfile = updateDoctorProfile;
