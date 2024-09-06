"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create a Schema corresponding to the document interface.
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    gender: { type: String, required: false },
    age: { type: String, required: false },
    specialization: { type: String, required: true },
    headline: { type: String, required: true },
    description: { type: String, required: false },
}, {
    timestamps: true,
});
// Match user entered password to hashed password in database
// schema.methods.matchPassword = async function (enteredPassword: any) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };
// Encrypt password using bcrypt
// schema.pre('save', async function (next: any) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   // @ts-ignore
//   this.password = await bcrypt.hash(this.password, salt);
// });
// Create a Model.
const _Doctor = (0, mongoose_1.model)('Doctor', schema);
exports.default = _Doctor;
