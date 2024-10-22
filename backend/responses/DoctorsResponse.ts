import Doctor from "../entities/doctor";

export class DoctorsResponse {
    userid:string;
    name: string;
    email: string;
    gender: string;
    experience: string;
    specialization: string;
    address: string;
    state: string;
    city: string;
    status: string;
}

export function mapper(doctor: Doctor): DoctorsResponse{
    let doctorTo: DoctorsResponse = new DoctorsResponse();
    doctorTo.userid = doctor.userId;
    doctorTo.name = doctor.name;
    doctorTo.address = doctor.address;
    doctorTo.email = doctor.email;
    doctorTo.experience = doctor.experience;
    doctorTo.specialization = doctor.specialization;
    doctorTo.status = doctor.status;
    return doctorTo;
}