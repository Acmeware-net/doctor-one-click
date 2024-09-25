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
exports.updateCheckup = exports.findCheckups = exports.findCheckup = exports.createCheckup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const checkupModel_1 = __importDefault(require("../models/checkupModel"));
// Create a new checkup document
const createCheckup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId, patientId, notes, prescription, images } = req.body;
    const datetime = new Date();
    console.log(`doctor: ${doctorId}, patient: ${patientId}, date-time: ${datetime}, notes: ${notes}, prescription: ${prescription}, images: ${images}`);
    const checkup = yield checkupModel_1.default.create({
        doctorId,
        patientId,
        datetime,
        notes,
        prescription,
        images
    });
    if (checkup) {
        res.status(201).json({
            message: 'Checkup created successfully', checkup: checkup
        });
    }
    else {
        res.status(400).json({ message: 'Unable to create checkup' });
        throw new Error('Unable to create checkup');
    }
}));
exports.createCheckup = createCheckup;
// Get a checkup document by id
const findCheckup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(`id is ${id}`);
    const checkup = yield checkupModel_1.default.findOne({ id });
    if (checkup) {
        res.status(200).json({
            doctor_id: checkup.doctorId,
            patient_id: checkup.patientId,
            date_time: checkup.datetime,
            notes: checkup.notes,
            prescription: checkup.prescription,
            images: checkup.images,
        });
    }
    else {
        res.status(404).json({ message: 'Checkup not found' });
        throw new Error('Unable to find checkup');
    }
}));
exports.findCheckup = findCheckup;
// Get a checkup document by id
const findCheckups = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(`id is ${id}`);
    const checkup = yield checkupModel_1.default.findOne({ id });
    if (checkup) {
        res.status(200).json({
            doctor_id: checkup.doctorId,
            patient_id: checkup.patientId,
            date_time: checkup.datetime,
            notes: checkup.notes,
            prescription: checkup.prescription,
            images: checkup.images,
        });
    }
    else {
        res.status(404).json({ message: 'Checkup not found' });
        throw new Error('Unable to find checkup');
    }
}));
exports.findCheckups = findCheckups;
// Update a checkup document by id
const updateCheckup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(`id is ${id} notes are ${req.body.notes} params are ${req.body.params}`);
    const checkup = yield checkupModel_1.default.findOne({ id });
    if (checkup) {
        console.log(`checkup found ${checkup}`);
        checkup.notes = req.body.notes || checkup.notes;
        checkup.prescription = req.body.prescription || checkup.prescription;
        checkup.images = req.body.images || checkup.images;
        const updateCheckup = yield checkup.save();
        if (updateCheckup) {
            res.status(201).json({
                doctor_id: updateCheckup.doctorId,
                patient_id: updateCheckup.patientId,
                date_time: updateCheckup.datetime,
                notes: updateCheckup.notes,
                prescription: updateCheckup.prescription,
                images: updateCheckup.images,
            });
        }
        else {
            res.status(404).json({ message: "Unable to update requested checkup" });
        }
    }
    else {
        res.status(404).json({ message: 'Checkup not found' });
        throw new Error('Unable to find checkup');
    }
}));
exports.updateCheckup = updateCheckup;
