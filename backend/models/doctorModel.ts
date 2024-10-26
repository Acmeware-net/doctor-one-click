import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import Doctor from '../entities/doctor';

// Create a Schema corresponding to the document interface.
const doctorSchema = new Schema<Doctor>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  gender: { type: String, required: false },
  dateofbirth: { type: String, required: false },
  specialization: { type: String, required: false },
  license: { type: String, required: false },
  bio: { type: String, required: false },
  image: { type: String, required: false },
  headline: { type: String, required: false },
  experience: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zipcode: { type: String, required: false },
  status: { type: String, required: false },
  checkups: { type: [], required: false },
  appointments: { type: [], required: false },
  location: Object, 
},
{
  timestamps: true,
});

// Match doctor entered password to hashed password in database
doctorSchema.methods.matchPassword = async function (enteredPassword: any) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Encrypt password using bcrypt
  doctorSchema.pre('save', async function (next: any) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, salt);
  });

// Create a Model.
const Doctor = model<Doctor>('Doctor', doctorSchema);

export default Doctor;