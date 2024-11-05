
interface Doctor{
    // User id, different than doctor's id
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    specialization: string;
    // Medical license or medical prationer certifficate etc.
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
    // It is like organization Id
    // Such as, if many doctors belong to a hospital then the Id of that hospital 
    // which would be the tenant id can be used to group them and perform similar
    // actions on their accounts
    tenantid: string;
    // Tenant type is currently used to show building icon on the map
    // For hospital use the value "building", for private clicnic in the house, use the value "home", for private clinic
    // in private office use the value "store-alt"
    tenanttype: string;
    // Location on the map, i.e. lat and long
    location: object;
    // Check up fee
    fee: string;
  }

export default Doctor;