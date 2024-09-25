import Patient from "../entities/patient";

export class PatientsResponse {
    name: string;
    email: string;
    phone: string;
    gender: string;
    dateofbirth: string;
    address: string;
    state: string;
    city: string;
}

export function mapper(patient: Patient): PatientsResponse{
    let patientTo: PatientsResponse = new PatientsResponse();
    patientTo.name = patient.name;
    patientTo.address = patient.address;
    patientTo.email = patient.email;
    patientTo.address = patient.address;
    patientTo.phone = patient.phone;
    patientTo.dateofbirth = patient.dateofbirth;
    patientTo.gender = patient.gender;
    return patientTo;
}