export default interface Appointment{
    doctorId: string;
    patientId: string;
    // Scheduled | Pending | Canceled
    status: string;
    // Date and time of the appointment
    datetime: Date;
}