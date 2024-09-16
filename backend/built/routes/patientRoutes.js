"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientController_js_1 = require("../controllers/patientController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
// Patient routes
router.post('/register', patientController_js_1.registerPatient);
router.post('/auth', patientController_js_1.authPatient);
router.post('/logout', patientController_js_1.logoutPatient);
router
    .route('/profile')
    .get(authMiddleware_js_1.protectPatient, patientController_js_1.getPatientProfile)
    .put(authMiddleware_js_1.protectPatient, patientController_js_1.updatePatientProfile);
exports.default = router;
