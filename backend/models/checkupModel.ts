import { Schema, model } from "mongoose";
import Checkup from "../entities/checkup";



const schema = new Schema<Checkup>({
    doctorId: {type: String, required: true},
    patientId: {type: String, required: true},
    datetime: {type: Date, required:true},
    notes: {type: String, required: true},
    prescription: {type: [], required: true},
    images: {type: [], required: true},
  },
  {
    timestamps: true,
  });

  const _Checkup = model<Checkup>('Checkup', schema);

export default _Checkup;