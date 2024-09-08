"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const doctorController_js_1 = require("../controllers/doctorController.js");
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
// Doctor routes
router.post('/registerdoctor', doctorController_js_1.registerDoctor);
router.post('/authdoctor', doctorController_js_1.authDoctor);
router.post('/logoutdoctor', doctorController_js_1.logoutDoctor);
router
    .route('/profiledoctor')
    .get(authMiddleware_js_1.protectDoctor, doctorController_js_1.getDoctorProfile)
    .put(authMiddleware_js_1.protectDoctor, doctorController_js_1.updateDoctorProfile);
exports.default = router;
