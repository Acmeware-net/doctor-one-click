import Appointment from "./appointment";
import Checkup from "./checkup";

interface Doctor{
    // User id, different than doctor's id
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    specialization: string;
    // Medical license or medical prationer certificate etc.
    license: string;
    // Doctor's description (optional)
    bio: string;
    // Doctor's profile image
    image: string;
    // A headline in doctor's profile
    headline: string;
    experience: string;
    gender: string;
    dateofbirth: string;
    city: string;
    state: string;
    zipcode: string;
    // List of checkups from all doctors past or present
    checkups: string[];
    // List of appointments from all doctors past or present
    appointments: string[];
    // online | offline | away | out of office for a period | currently in meeting etc.
    status: string;
  }

export default Doctor;