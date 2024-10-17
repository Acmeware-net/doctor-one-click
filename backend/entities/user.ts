
interface User{
    username: string;
    email: string;
    password: string;
    // phone: string;
    // address: string;
    // dateofbirth: string;
    // gender: string;
    // city: string;
    // state: string;
    // zipcode: string;
    // admin | doctor | patient (case sensitive)
    type: string;
    enabled: boolean;
  }

export default User;