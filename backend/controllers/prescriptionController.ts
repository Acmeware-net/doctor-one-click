import asyncHandler from 'express-async-handler';
import Prescription from '../models/prescriptionModel';
import _Prescription from '../models/prescriptionModel';

// Create a new prescription document

const createPrescription = asyncHandler(async (req: any, res: any) => {
    const { name, dose, number, route, frequency, dispensed, refills, substitute } = req.body;
    const datetime = new Date();
    console.log(`name: ${name}, dose: ${dose}, number: ${number}, route: ${route}, frequency: ${frequency}, dispensed: ${dispensed}, refills: ${refills}, substitute: ${substitute}`)
    const prescription = await Prescription.create({
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
        })
    } else {
        res.status(400).json({ message: 'Unable to create prescription' });
        throw new Error('Unable to create prescription');
    }
});

// Get a prescription document by id

const findPrescription = asyncHandler(async (req: any, res: any) => {
    const { id } = req.body;
    console.log(`id is ${id}`);
    const prescription = await Prescription.findOne({ id });

    if (prescription) {
        res.status(200).json({
            name: prescription.name,
            dose: prescription.dose,
            number: prescription.number,
            route: prescription.route,
            frequency: prescription.frequency,
            refills: prescription.refills,
            substitute: prescription.substitute
        })
    } else {
        res.status(404).json({ message: 'Prescription not found' });
        throw new Error('Unable to find prescription');
    }
});

// Update a prescription document by id

const updatePrescription = asyncHandler(async (req: any, res: any) => {
    const { id } = req.body;
    console.log(`id is ${id} name are ${req.body.name} params are ${req.body.params}`);
    const prescription = await Prescription.findOne({ id });

    if (prescription) {
        console.log(`prescription found ${prescription}`)
        prescription.name = req.body.name || prescription.name;
        prescription.dose = req.body.dose || prescription.dose;
        prescription.number = req.body.number || prescription.number;
        prescription.route = req.body.route || prescription.route;
        prescription.frequency = req.body.frequency || prescription.frequency;
        prescription.refills = req.body.refills || prescription.refills;
        prescription.substitute = req.body.substitute || prescription.substitute;

        const updatePrescription = await prescription.save();
        if (updatePrescription) {
            res.status(201).json({
                name: updatePrescription.name,
                dose: updatePrescription.dose,
                number: updatePrescription.number,
                route: updatePrescription.route,
                frequency: updatePrescription.frequency,
                refills: updatePrescription.refills,
                substitute: updatePrescription.substitute,
            })
        } else {
            res.status(404).json({ message: "Unable to update requested prescription" });
        }
    } else {
        res.status(404).json({ message: 'Prescription not found' });
        throw new Error('Unable to find prescription');
    }
});

export {
    createPrescription,
    findPrescription,
    updatePrescription,
}