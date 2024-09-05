import User from "./user";

export class Doctor implements User{
    phone: string;
    address: string;
    gender: string;
    age: string;
    name: string;
    email: string;
    password: string;
    specialization: string;
}