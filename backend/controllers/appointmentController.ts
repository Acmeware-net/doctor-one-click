import asyncHandler from 'express-async-handler';
import Appointment from '../models/appointmentModel';
import _Prescription from '../models/prescriptionModel';



// Create a new appointment document
const createAppointment = asyncHandler(async (req: any, res: any) => {
    console.log(`inside create appointment method...`)
    const { doctorId, patientId, status, datetime } = req.body;
    console.log(`doctor: ${doctorId}, patient: ${patientId}, date-time: ${datetime}, status: ${status}`)
    const appointment = await Appointment.create({
        doctorId,
        patientId,
        status,
        datetime,
    });

    if (appointment) {
        res.status(201).json({
            message: 'Appointment created successfully', appointment:appointment
        })
    } else {
        res.status(400).json({ message: 'Unable to create appointment' });
        throw new Error('Unable to create appointment');
    }
});

// Get a appointment document by id
const findAppointment = asyncHandler(async (req: any, res: any) => {
    const { id } = req.params.id;
    console.log(`id is ${id}`);
    const appointment = await Appointment.findOne({ _id:id });

    if (appointment) {
        res.status(200).json({
            doctor_id: appointment.doctorId,
            patient_id: appointment.patientId,
            date_time: appointment.datetime,
            status: appointment.status,
        })
    } else {
        res.status(404).json({ message: 'Appointment not found' });
        throw new Error('Unable to find appointment');
    }
});

// Get a appointments document by patient id

const findAppointmentsByPatient = asyncHandler(async (req: any, res: any) => {
    const { id } = req.body;
    console.log(`id is ${id}`);
    const appointments = await Appointment.find({ id });

    if (appointments) {
        res.status(200).json({appointments
        })
    } else {
        res.status(404).json({ message: 'Appointments not found' });
        throw new Error('Unable to find appointments');
    }
});


// Get appointments documents by doctor id

const findAppointmentsByDoctor = asyncHandler(async (req: any, res: any) => {
    const { id } = req.body;
    console.log(`id is ${id}`);
    const appointments = await Appointment.find({ id });

    if (appointments) {
        res.status(200).json({appointments
        })
    } else {
        res.status(404).json({ message: 'Appointments not found' });
        throw new Error('Unable to find appointments');
    }
});


// Update a appointment document by id

const updateAppointment = asyncHandler(async (req: any, res: any) => {
    const { id } = req.body;
    console.log(`id is ${id} notes are ${req.body.notes} params are ${req.body.params}`);
    const appointment = await Appointment.findOne({ id });

    if (appointment) {
        console.log(`appointment found ${appointment}`)
        appointment.status = req.body.status || appointment.status;

        const updateAppointment = await appointment.save();
        if (updateAppointment) {
            res.status(201).json({
                doctor_id: updateAppointment.doctorId,
                patient_id: updateAppointment.patientId,
                date_time: updateAppointment.datetime,
                status: updateAppointment.status,
            })
        } else {
            res.status(404).json({ message: "Unable to update requested appointment" });
        }
    } else {
        res.status(404).json({ message: 'Appointment not found, wtf!' });
        throw new Error('Unable to find appointment');
    }
});

export {
    createAppointment,
    findAppointment,
    // findAppointments,
    findAppointmentsByPatient,
    findAppointmentsByDoctor,
    updateAppointment,
}