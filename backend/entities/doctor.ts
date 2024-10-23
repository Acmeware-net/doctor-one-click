import Appointment from "./appointment";
import Checkup from "./checkup";
import Position from '../entities/position';

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
    
    // List of IDs of checkups of all patients from the past 
    checkups: string[];
    
    // List of IDs of appointments of all patients past or future
    appointments: string[];
    
    // online | offline | away | out of office for a period | currently in meeting etc.
    status: string;
    
    timing: Timing;

    // Position on the map, i.e. lat and long
    position: Position;
  }

export default Doctor;