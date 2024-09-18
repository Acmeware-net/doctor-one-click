import { Schema, model, connect } from 'mongoose';
import bcrypt from 'bcryptjs';
import Patient from '../entities/patient';

// Create a Schema corresponding to the document interface.
const schema = new Schema<Patient>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  gender: { type: String, required: false },
  age: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
},
{
  timestamps: true,
});

// Match doctor entered password to hashed password in database
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
const _Patient = model<Patient>('Patient', schema);

export default _Patient;