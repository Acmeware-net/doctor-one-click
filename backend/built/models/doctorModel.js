"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Create a Schema corresponding to the document interface.
const doctorSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    gender: { type: String, required: false },
    dateofbirth: { type: String, required: false },
    specialization: { type: String, required: false },
    license: { type: String, required: false },
    bio: { type: String, required: false },
    image: { type: String, required: false },
    headline: { type: String, required: false },
    experience: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipcode: { type: String, required: false },
    status: { type: String, required: false },
    checkups: { type: [], required: false },
    appointments: { type: [], required: false },
    enabled: { type: Boolean, required: false, default: true },
}, {
    timestamps: true,
});
// Match doctor entered password to hashed password in database
doctorSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredPassword, this.password);
    });
};
// Encrypt password using bcrypt
doctorSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            next();
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        // @ts-ignore
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
});
// Create a Model.
const Doctor = (0, mongoose_1.model)('Doctor', doctorSchema);
exports.default = Doctor;
