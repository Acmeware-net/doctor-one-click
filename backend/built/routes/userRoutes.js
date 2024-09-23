"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const doctorController_js_1 = require("../controllers/doctorController.js");
const patientController_js_1 = require("../controllers/patientController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
// User routes
router.post('/', userController_js_1.registerUser);
router.post('/auth', userController_js_1.authUser);
router.post('/logout', userController_js_1.logoutUser);
router.route('/profile')
    .get(authMiddleware_js_1.protect, userController_js_1.getUserProfile)
    .put(authMiddleware_js_1.protect, userController_js_1.updateUserProfile);
// Doctor routes
router.route('/doctors').get(authMiddleware_js_1.protect, doctorController_js_1.getDoctors);
router.route('/doctor/:id').get(authMiddleware_js_1.protect, doctorController_js_1.getDoctorById);
router.route('/doctor/id/:id').get(authMiddleware_js_1.protect, doctorController_js_1.getDoctorByUserId);
// Patient routes
router.route('/patients').get(authMiddleware_js_1.protect, patientController_js_1.getPatients);
router.route('/patient/:id').get(authMiddleware_js_1.protect, patientController_js_1.getPatientById);
router.route('/patient/id/:id').get(authMiddleware_js_1.protect, patientController_js_1.getPatientByUserId);
// Appointment routes
// Checkup routes
exports.default = router;
