"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const appointmentController_js_1 = require("../controllers/appointmentController.js");
const router = express_1.default.Router();
// Appointment routes
router.route('/create').post(authMiddleware_js_1.protect, appointmentController_js_1.createAppointment);
router.route('/get/:id').get(authMiddleware_js_1.protect, appointmentController_js_1.findAppointment);
router.route('/get').get(authMiddleware_js_1.protect, appointmentController_js_1.findAppointments);
router.route('/update').put(authMiddleware_js_1.protect, appointmentController_js_1.updateAppointment);
exports.default = router;
