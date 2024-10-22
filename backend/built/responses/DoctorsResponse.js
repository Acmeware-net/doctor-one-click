"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsResponse = void 0;
exports.mapper = mapper;
class DoctorsResponse {
}
exports.DoctorsResponse = DoctorsResponse;
function mapper(doctor) {
    let doctorTo = new DoctorsResponse();
    doctorTo.userid = doctor.userId;
    doctorTo.name = doctor.name;
    doctorTo.address = doctor.address;
    doctorTo.email = doctor.email;
    doctorTo.experience = doctor.experience;
    doctorTo.specialization = doctor.specialization;
    doctorTo.status = doctor.status;
    return doctorTo;
}
