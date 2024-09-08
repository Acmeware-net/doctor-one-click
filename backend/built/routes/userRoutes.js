"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const patientController_js_1 = require("../controllers/patientController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
// user routes
router.post('/', userController_js_1.registerUser);
router.post('/auth', userController_js_1.authUser);
router.post('/logout', userController_js_1.logoutUser);
router
    .route('/profile')
    .get(authMiddleware_js_1.protect, userController_js_1.getUserProfile)
    .put(authMiddleware_js_1.protect, userController_js_1.updateUserProfile);
// Patient routes
router.post('/registerpatient', patientController_js_1.registerPatient);
router.post('/authpatient', patientController_js_1.authPatient);
router.post('/logoutpatient', patientController_js_1.logoutPatient);
router
    .route('/profilepatient')
    .get(authMiddleware_js_1.protectPatient, patientController_js_1.getPatientProfile)
    .put(authMiddleware_js_1.protectPatient, patientController_js_1.updatePatientProfile);
exports.default = router;
