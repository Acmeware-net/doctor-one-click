import { Schema, model } from 'mongoose';
import Prescription from '../entities/prescription';

const schema = new Schema<Prescription>({
    name: {type: String, required: true},
    dose: {type: String, required: true},
    number: {type: String, required: false},
    route: {type:String, required:false},
    frequency: {type:String, required:false},
    dispensed: {type:String, required:false},
    refills: {type:Boolean, required:false},
    substitute: {type:Boolean, required:false},
  },
  {
    timestamps: true,
  });

  const _Prescription = model<Prescription>('Prescription',schema);

  export default _Prescription;