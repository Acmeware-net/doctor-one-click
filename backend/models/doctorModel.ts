import { Schema, model, connect } from 'mongoose';
import bcrypt from 'bcryptjs';
import Doctor from '../entities/doctor';

// Create a Schema corresponding to the document interface.
const doctorSchema = new Schema<Doctor>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  gender: { type: String, required: false },
  age: { type: String, required: false },
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