import Position from '../entities/position';

export default interface Patient{
    // User id, different than doctor's id
    userId: string;
    name: string;
    phone: string;
    address: string;
    gender: string;
    dateofbirth: string;
    email: string;
    password: string;
    // List of IDs of checkups from all doctors from the past 
    checkups: string[];
    // List of IDs of appointments from all doctors past or future
    appointments: string[];
    city: string;
    state: string;
    zipcode: string;
    // online | offline | away | out of office for a period | currently in meeting etc.
    status: string;
    image: string;
    // Position on the map, i.e. lat and long
    position: Position;
}