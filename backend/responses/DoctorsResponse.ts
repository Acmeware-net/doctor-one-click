import Doctor from "../entities/doctor";

export class DoctorsResponse {
    name: string;
    email: string;
    gender: string;
    experience: string;
    specialization: string;
    address: string;
    state: string;
    city: string;
}

export function mapper(doctor: Doctor){
    let doctorTo: DoctorsResponse = new DoctorsResponse();
    doctorTo.name = doctor.name;
    doctorTo.address = doctor.address;
    doctorTo.email = doctor.email;
    doctorTo.experience = doctor.experience;
    doctorTo.specialization = doctor.specialization;
    return doctorTo;
}