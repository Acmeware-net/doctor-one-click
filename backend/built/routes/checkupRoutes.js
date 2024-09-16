"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkupController_js_1 = require("../controllers/checkupController.js");
const router = express_1.default.Router();
// Checkup routes
router.post('/create', checkupController_js_1.createCheckup);
router.get('/get', checkupController_js_1.findCheckup);
router.post('/update', checkupController_js_1.updateCheckup);
exports.default = router;
