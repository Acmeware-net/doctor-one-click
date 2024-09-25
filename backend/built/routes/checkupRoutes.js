"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const checkupController_js_1 = require("../controllers/checkupController.js");
const router = express_1.default.Router();
// Checkup routes
router.route('/create').post(authMiddleware_js_1.protect, checkupController_js_1.createCheckup);
router.route('/get/:id').get(authMiddleware_js_1.protect, checkupController_js_1.findCheckup);
router.route('/get').get(authMiddleware_js_1.protect, checkupController_js_1.findCheckups);
router.route('/update').put(authMiddleware_js_1.protect, checkupController_js_1.updateCheckup);
exports.default = router;
