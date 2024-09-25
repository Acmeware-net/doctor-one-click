export default interface Checkup{

    patientId: string;
    doctorId: string;
    notes: string;
    prescription: string[];
    images: string[];
    datetime: Date;
}