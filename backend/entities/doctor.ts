import Appointment from "./appointment";
import Checkup from "./checkup";

interface Doctor{
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    specialization: string;
    license: string;
    bio: string;
    image: string;
    headline: string;
    experience: string;
    gender: string;
    dateofbirth: string;
    city: string;
    state: string;
    zipcode: string;
    checkups: string[];
    appointments: string[];
  }

export default Doctor;