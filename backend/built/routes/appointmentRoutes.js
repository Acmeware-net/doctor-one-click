"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentController_js_1 = require("../controllers/appointmentController.js");
const router = express_1.default.Router();
// Appointment routes
router.post('/create', appointmentController_js_1.createAppointment);
router.get('/get', appointmentController_js_1.findAppointment);
router.post('/update', appointmentController_js_1.updateAppointment);
exports.default = router;
