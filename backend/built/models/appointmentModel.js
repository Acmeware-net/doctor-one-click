"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    status: { type: String, required: true },
}, {
    timestamps: true,
});
const _Appointment = (0, mongoose_1.model)('Appointment', schema);
exports.default = _Appointment;
