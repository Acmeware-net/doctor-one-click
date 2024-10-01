
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
    // List of checkups from all doctors past or present
    checkups: string[];
    // List of appointments from all doctors past or present
    appointments: string[];
    city: string;
    state: string;
    zipcode: string;
    // online | offline | away | out of office for a period | currently in meeting etc.
    status: string;
    image: string;
}