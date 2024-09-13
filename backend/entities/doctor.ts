import Appointment from "./appointment";
import Checkup from "./checkup";

interface Doctor{
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    gender: string;
    dob: string;
    specialization: string;
    bio: string;
    image: string;
    headline: string;
    experience: string;
    city: string;
    state: string;
    zipcode: string;
    checkups: Checkup[];
    appointments: Appointment[];
  }

export default Doctor;