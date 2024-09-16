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
exports.updatePrescription = exports.findPrescription = exports.createPrescription = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prescriptionModel_1 = __importDefault(require("../models/prescriptionModel"));
// Create a new prescription document
const createPrescription = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dose, number, route, frequency, dispensed, refills, substitute } = req.body;
    const datetime = new Date();
    console.log(`name: ${name}, dose: ${dose}, number: ${number}, route: ${route}, frequency: ${frequency}, dispensed: ${dispensed}, refills: ${refills}, substitute: ${substitute}`);
    const prescription = yield prescriptionModel_1.default.create({
        name,
        dose,
        number,
        route,
        frequency,
        dispensed,
        refills,
        substitute
    });
    if (prescription) {
        res.status(201).json({
            message: 'Prescription created successfully',
        });
    }
    else {
        res.status(400).json({ message: 'Unable to create prescription' });
        throw new Error('Unable to create prescription');
    }
}));
exports.createPrescription = createPrescription;
// Get a prescription document by id
const findPrescription = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(`id is ${id}`);
    const prescription = yield prescriptionModel_1.default.findOne({ id });
    if (prescription) {
        res.status(200).json({
            name: prescription.name,
            dose: prescription.dose,
            number: prescription.number,
            route: prescription.route,
            frequency: prescription.frequency,
            refills: prescription.refills,
            substitute: prescription.substitute
        });
    }
    else {
        res.status(404).json({ message: 'Prescription not found' });
        throw new Error('Unable to find prescription');
    }
}));
exports.findPrescription = findPrescription;
// Update a prescription document by id
const updatePrescription = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(`id is ${id} name are ${req.body.name} params are ${req.body.params}`);
    const prescription = yield prescriptionModel_1.default.findOne({ id });
    if (prescription) {
        console.log(`prescription found ${prescription}`);
        prescription.name = req.body.name || prescription.name;
        prescription.dose = req.body.dose || prescription.dose;
        prescription.number = req.body.number || prescription.number;
        prescription.route = req.body.route || prescription.route;
        prescription.frequency = req.body.frequency || prescription.frequency;
        prescription.refills = req.body.refills || prescription.refills;
        prescription.substitute = req.body.substitute || prescription.substitute;
        const updatePrescription = yield prescription.save();
        if (updatePrescription) {
            res.status(201).json({
                name: updatePrescription.name,
                dose: updatePrescription.dose,
                number: updatePrescription.number,
                route: updatePrescription.route,
                frequency: updatePrescription.frequency,
                refills: updatePrescription.refills,
                substitute: updatePrescription.substitute,
            });
        }
        else {
            res.status(404).json({ message: "Unable to update requested prescription" });
        }
    }
    else {
        res.status(404).json({ message: 'Prescription not found' });
        throw new Error('Unable to find prescription');
    }
}));
exports.updatePrescription = updatePrescription;
