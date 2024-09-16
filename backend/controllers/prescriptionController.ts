import asyncHandler from 'express-async-handler';
import Checkup from '../models/checkupModel';
import _Prescription from '../models/prescriptionModel';

// Create a new checkup document

const createCheckup = asyncHandler(async (req: any, res: any) => {
    const { doctorId, patientId, notes, prescription, images } = req.body;
    const datetime = new Date();
    console.log(`doctor: ${doctorId}, patient: ${patientId}, date-time: ${datetime}, notes: ${notes}, prescription: ${prescription}, images: ${images}`)
    const checkup = await Checkup.create({
        doctorId,
        patientId,
        datetime,
        notes,
        prescription,
        images
    });

    if (checkup) {
        res.status(201).json({
            message: 'Checkup created successfully',
        })
    } else {
        res.status(400).json({ message: 'Unable to create checkup' });
        throw new Error('Unable to create checkup');
    }
});

// Get a checkup document by id

const findCheckup = asyncHandler(async (req: any, res: any) => {
    const { id } = req.body;
    console.log(`id is ${id}`);
    const checkup = await Checkup.findOne({ id });

    if (checkup) {
        res.status(200).json({
            doctor_id: checkup.doctorId,
            patient_id: checkup.patientId,
            date_time: checkup.datetime,
            notes: checkup.notes,
            prescription: checkup.prescription,
            images: checkup.images,
        })
    } else {
        res.status(404).json({ message: 'Checkup not found' });
        throw new Error('Unable to find checkup');
    }
});

// Update a checkup document by id

const updateCheckup = asyncHandler(async (req: any, res: any) => {
    const { id } = req.body;
    console.log(`id is ${id} notes are ${req.body.notes} params are ${req.body.params}`);
    const checkup = await Checkup.findOne({ id });

    if (checkup) {
        console.log(`checkup found ${checkup}`)
        checkup.notes = req.body.notes || checkup.notes;
        checkup.prescription = req.body.prescription || checkup.prescription;
        checkup.images = req.body.images || checkup.images;

        const updateCheckup = await checkup.save();
        if (updateCheckup) {
            res.status(201).json({
                doctor_id: updateCheckup.doctorId,
                patient_id: updateCheckup.patientId,
                date_time: updateCheckup.datetime,
                notes: updateCheckup.notes,
                prescription: updateCheckup.prescription,
                images: updateCheckup.images,
            })
        } else {
            res.status(404).json({ message: "Unable to update requested checkup" });
        }
    } else {
        res.status(404).json({ message: 'Checkup not found' });
        throw new Error('Unable to find checkup');
    }
});

export {
    createCheckup,
    findCheckup,
    updateCheckup,
}