"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_js_1 = require("../controllers/doctorController.js");
const patientController_js_1 = require("../controllers/patientController.js");
const appointmentController_js_1 = require("../controllers/appointmentController.js");
const checkupController_js_1 = require("../controllers/checkupController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
// doctor routes
router.post('/', doctorController_js_1.registerDoctor);
router.post('/auth', doctorController_js_1.authDoctor);
router.post('/logout', doctorController_js_1.logoutDoctor);
router
    .route('/profile')
    .get(authMiddleware_js_1.protect, doctorController_js_1.getDoctorProfile)
    .put(authMiddleware_js_1.protect, doctorController_js_1.updateDoctorProfile);
// Patient routes
router.post('/registerpatient', patientController_js_1.registerPatient);
router.post('/authpatient', patientController_js_1.authPatient);
router.post('/logoutpatient', patientController_js_1.logoutPatient);
router
    .route('/profilepatient')
    .get(authMiddleware_js_1.protectPatient, patientController_js_1.getPatientProfile)
    .put(authMiddleware_js_1.protectPatient, patientController_js_1.updatePatientProfile);
// Checkup routes
router.post('/createcheckup', checkupController_js_1.createCheckup);
router.get('/getcheckup', checkupController_js_1.findCheckup);
router.post('/updatecheckup', checkupController_js_1.updateCheckup);
// Appointment routes
router.post('/createappointment', appointmentController_js_1.createAppointment);
router.get('/getappointment', appointmentController_js_1.findAppointment);
router.post('/updateappointment', appointmentController_js_1.updateAppointment);
exports.default = router;
