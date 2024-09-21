"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsResponse = void 0;
exports.mapper = mapper;
class PatientsResponse {
}
exports.PatientsResponse = PatientsResponse;
function mapper(patient) {
    let patientTo = new PatientsResponse();
    patientTo.name = patient.name;
    patientTo.address = patient.address;
    patientTo.email = patient.email;
    patientTo.address = patient.address;
    patientTo.phone = patient.phone;
    patientTo.dateofbirth = patient.dateofbirth;
    patientTo.gender = patient.gender;
    return patientTo;
}
