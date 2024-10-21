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
exports.updateAppointment = exports.findAppointmentsByDoctor = exports.findAppointmentsByPatient = exports.findAppointment = exports.createAppointment = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
// Create a new appointment document
const createAppointment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`inside create appointment method...`);
    const { doctorId, patientId, status, datetime } = req.body;
    console.log(`doctor: ${doctorId}, patient: ${patientId}, date-time: ${datetime}, status: ${status}`);
    const appointment = yield appointmentModel_1.default.create({
        doctorId,
        patientId,
        status,
        datetime,
    });
    if (appointment) {
        res.status(201).json({
            message: 'Appointment created successfully', appointment: appointment
        });
    }
    else {
        res.status(400).json({ message: 'Unable to create appointment' });
        throw new Error('Unable to create appointment');
    }
}));
exports.createAppointment = createAppointment;
// Get a appointment document by id
const findAppointment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params.id;
    console.log(`id is ${id}`);
    const appointment = yield appointmentModel_1.default.findOne({ _id: id });
    if (appointment) {
        res.status(200).json({
            doctor_id: appointment.doctorId,
            patient_id: appointment.patientId,
            date_time: appointment.datetime,
            status: appointment.status,
        });
    }
    else {
        res.status(404).json({ message: 'Appointment not found' });
        throw new Error('Unable to find appointment');
    }
}));
exports.findAppointment = findAppointment;
// Get a appointments document by patient id
const findAppointmentsByPatient = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(`id is ${id}`);
    const appointments = yield appointmentModel_1.default.find({ id });
    if (appointments) {
        res.status(200).json({ appointments
        });
    }
    else {
        res.status(404).json({ message: 'Appointments not found' });
        throw new Error('Unable to find appointments');
    }
}));
exports.findAppointmentsByPatient = findAppointmentsByPatient;
// Get a appointments document by doctor id
const findAppointmentsByDoctor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(`id is ${id}`);
    const appointments = yield appointmentModel_1.default.find({ id });
    if (appointments) {
        res.status(200).json({ appointments
        });
    }
    else {
        res.status(404).json({ message: 'Appointments not found' });
        throw new Error('Unable to find appointments');
    }
}));
exports.findAppointmentsByDoctor = findAppointmentsByDoctor;
// Update a appointment document by id
const updateAppointment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(`id is ${id} notes are ${req.body.notes} params are ${req.body.params}`);
    const appointment = yield appointmentModel_1.default.findOne({ id });
    if (appointment) {
        console.log(`appointment found ${appointment}`);
        appointment.status = req.body.status || appointment.status;
        const updateAppointment = yield appointment.save();
        if (updateAppointment) {
            res.status(201).json({
                doctor_id: updateAppointment.doctorId,
                patient_id: updateAppointment.patientId,
                date_time: updateAppointment.datetime,
                status: updateAppointment.status,
            });
        }
        else {
            res.status(404).json({ message: "Unable to update requested appointment" });
        }
    }
    else {
        res.status(404).json({ message: 'Appointment not found, wtf!' });
        throw new Error('Unable to find appointment');
    }
}));
exports.updateAppointment = updateAppointment;
