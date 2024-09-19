import Appointment from "./appointment";
import Checkup from "./checkup";

export default interface Patient{
    userId: string;
    name: string;
    phone: string;
    address: string;
    gender: string;
    dateofbirth: string;
    email: string;
    password: string;
    // TODO
    checkups: string[];
    appointments: string[];
    city: string;
    state: string;
    zipcode: string;
}