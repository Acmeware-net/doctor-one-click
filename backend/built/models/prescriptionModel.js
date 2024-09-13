"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    dose: { type: String, required: true },
    number: { type: String, required: false },
    route: { type: String, required: false },
    frequency: { type: String, required: false },
    dispensed: { type: String, required: false },
    refills: { type: Boolean, required: false },
    substitute: { type: Boolean, required: false },
}, {
    timestamps: true,
});
const _Prescription = (0, mongoose_1.model)('Prescription', schema);
exports.default = _Prescription;
