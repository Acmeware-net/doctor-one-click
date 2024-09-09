import Appointment from "./appointment";
import Checkup from "./checkup";

export default class Patient{
    phone: string;
    address: string;
    gender: string;
    age: string;
    name: string;
    email: string;
    password: string;
    // TODO
    checkups: Checkup[];
    appointments: Appointment[];
    city: string;
    country: string;
}