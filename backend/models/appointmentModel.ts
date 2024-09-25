import { Schema, model } from 'mongoose';
import Appointment from '../entities/appointment';

const schema = new Schema<Appointment>({
  doctorId: {type: String, required: true},
  patientId: {type: String, required: true},
  status: {type: String, required: true},
  datetime: {type:Date, required:true}
},
{
  timestamps: true,
});

const _Appointment = model<Appointment>('Appointment', schema);

export default _Appointment;