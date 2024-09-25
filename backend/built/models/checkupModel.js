"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    datetime: { type: Date, required: true },
    notes: { type: String, required: true },
    prescription: { type: [], required: true },
    images: { type: [], required: true },
}, {
    timestamps: true,
});
const _Checkup = (0, mongoose_1.model)('Checkup', schema);
exports.default = _Checkup;
