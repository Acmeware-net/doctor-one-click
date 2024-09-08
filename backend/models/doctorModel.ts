import { Schema, model, connect } from 'mongoose';
import bcrypt from 'bcryptjs';
import Doctor from '../entities/doctor';

// Create a Schema corresponding to the document interface.
const schema = new Schema<Doctor>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: false },
  experience: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  specialization: {type: String, required: true},
  headline: {type: String, required: true},
  description: {type: String, required: false},
},
{
  timestamps: true,
});

// Match user entered password to hashed password in database
schema.methods.matchPassword = async function (enteredPassword: any) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Encrypt password using bcrypt
  schema.pre('save', async function (next: any) {
    if (!this.isModified('password')) {
      
      next();
    }
    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, salt);
  });

// Create a Model.
const _Doctor = model<Doctor>('Doctor', schema);

export default _Doctor;