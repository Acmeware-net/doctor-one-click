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
exports.updatePatientProfile = exports.getPatientProfile = exports.logoutPatient = exports.registerPatient = exports.authPatient = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const patientModel_js_1 = __importDefault(require("../models/patientModel.js"));
const generateToken_js_1 = __importDefault(require("../utils/generateToken.js"));
// @desc    Auth patient & get token
// @route   POST /api/patients/auth
// @access  Public
const authPatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(`email : ${email}`);
    const patient = yield patientModel_js_1.default.findOne({ email });
    // @ts-ignore
    if (patient && (yield patient.matchPassword(password))) {
        (0, generateToken_js_1.default)(res, patient._id);
        res.json({
            _id: patient._id,
            name: patient.name,
            email: patient.email,
            dateofbirth: patient.dateofbirth,
            gender: patient.gender,
            phone: patient.phone,
            address: patient.address,
            city: patient.city,
            state: patient.state,
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
}));
exports.authPatient = authPatient;
// @desc    Register a new patient
// @route   POST /api/patients
// @access  Public
const registerPatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, age, gender, phone, address, city, country } = req.body;
    const patientExists = yield patientModel_js_1.default.findOne({ email });
    if (patientExists) {
        res.status(400);
        throw new Error('patient already exists');
    }
    const patient = yield patientModel_js_1.default.create({
        name,
        email,
        password,
        age,
        gender,
        phone,
        address,
        city,
        country,
    });
    if (patient) {
        (0, generateToken_js_1.default)(res, patient._id);
        res.status(201).json({
            _id: patient._id,
            name: patient.name,
            email: patient.email,
            dateofbirth: patient.dateofbirth,
            gender: patient.gender,
            phone: patient.phone,
            address: patient.address,
            city: patient.city,
            state: patient.state,
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid patient data');
    }
}));
exports.registerPatient = registerPatient;
// @desc    Logout patient / clear cookie
// @route   POST /api/patients/logout
// @access  Public
const logoutPatient = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logoutPatient = logoutPatient;
// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private
const getPatientProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patientModel_js_1.default.findById(req.patient._id);
    console.log(`Patient id: ${req.patient._id}`);
    if (patient) {
        res.json({
            _id: patient._id,
            name: patient.name,
            email: patient.email,
            dateofbirth: patient.dateofbirth,
            gender: patient.gender,
            phone: patient.phone,
            address: patient.address,
            city: patient.city,
            state: patient.state,
        });
    }
    else {
        res.status(404);
        throw new Error('patient not found');
    }
}));
exports.getPatientProfile = getPatientProfile;
// @desc    Update patient profile
// @route   PUT /api/patients/profile
// @access  Private
const updatePatientProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patientModel_js_1.default.findById(req.patient._id);
    if (patient) {
        patient.name = req.body.name || patient.name;
        patient.email = req.body.email || patient.email;
        patient.dateofbirth = req.body.age || patient.dateofbirth;
        patient.gender = req.body.gender || patient.gender;
        patient.phone = req.body.phone || patient.phone;
        patient.address = req.body.address || patient.address;
        patient.city = req.body.city || patient.city;
        patient.state = req.body.country || patient.state;
        if (req.body.password) {
            patient.password = req.body.password;
        }
        const updatedpatient = yield patient.save();
        res.json({
            _id: updatedpatient._id,
            name: updatedpatient.name,
            email: updatedpatient.email,
            dateofbirth: updatedpatient.dateofbirth,
            gender: updatedpatient.gender,
            phone: updatedpatient.phone,
            address: updatedpatient.address,
            city: updatedpatient.city,
            state: updatedpatient.state,
        });
    }
    else {
        res.status(404);
        throw new Error('patient not found');
    }
}));
exports.updatePatientProfile = updatePatientProfile;
