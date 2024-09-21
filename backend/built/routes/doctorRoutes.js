"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_js_1 = require("../controllers/doctorController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
// doctor routes
router.post('/register', doctorController_js_1.registerDoctor);
router.post('/auth', doctorController_js_1.authDoctor);
router.post('/logout', doctorController_js_1.logoutDoctor);
router
    .route('/profile')
    .get(authMiddleware_js_1.protect, doctorController_js_1.getDoctorProfile)
    .put(authMiddleware_js_1.protect, doctorController_js_1.updateDoctorProfile);
// router.get('/',getDoctors);
router.route('/').get(authMiddleware_js_1.protect, doctorController_js_1.getDoctors);
exports.default = router;
