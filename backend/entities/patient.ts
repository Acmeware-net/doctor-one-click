import User from "./user";

export default class Patient implements User{
    phone: string;
    address: string;
    gender: string;
    age: string;
    name: string;
    email: string;
    password: string;
    specialization: string;
    description: string;
    headline: string;
    experience: string;
    city: string;
    country: string;
}