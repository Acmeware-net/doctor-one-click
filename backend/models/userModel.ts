import { Schema, model, connect } from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../entities/user';

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  enabled: { type: Boolean, required: false, default: true },

},
{
  timestamps: true,
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: any) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Encrypt password using bcrypt
  userSchema.pre('save', async function (next: any) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, salt);
  });

// Create a Model.
const User = model<User>('User', userSchema);

export default User;