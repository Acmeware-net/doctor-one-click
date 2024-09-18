import Appointment from "./appointment";
import Checkup from "./checkup";

export default interface Patient{
    userId: string;
    name: string;
    phone: string;
    address: string;
    gender: string;
    age: string;
    email: string;
    password: string;
    // TODO
    checkups: Checkup[];
    appointments: Appointment[];
    city: string;
    country: string;
}