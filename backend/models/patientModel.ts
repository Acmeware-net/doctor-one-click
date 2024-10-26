import { Schema, model, connect } from 'mongoose';
import bcrypt from 'bcryptjs';
import Patient from '../entities/patient';

// Create a Schema corresponding to the document interface.
const schema = new Schema<Patient>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  gender: { type: String, required: false },
  dateofbirth: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zipcode: { type: String, required: false },
  checkups: { type: [], required: false },
  appointments: { type: [], required: false },
  status: { type: String, required: false },
  image: { type: String, required: false },
  location: {type: Object , required: false},
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