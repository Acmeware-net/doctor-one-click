export default interface Checkup{

    patientId: string;
    doctorId: string;
    description: string;
    prescription: string[];
    images: string[];
    datetime: Date;
}