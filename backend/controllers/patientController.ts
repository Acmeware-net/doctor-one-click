import asyncHandler from 'express-async-handler';
import Patient from '../models/patientModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth patient & get token
// @route   POST /api/patients/auth
// @access  Public
const authPatient = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(`email : ${email}`)
  const patient = await Patient.findOne({ email });
  // @ts-ignore
  if (patient && (await patient.matchPassword(password))) {
    generateToken(res, patient._id);

    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      dateofbirth: patient.dateofbirth,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      city: patient.city,
      state: patient.state,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new patient
// @route   POST /api/patients
// @access  Public
const registerPatient = asyncHandler(async (req: any, res: any) => {
  const { name, email, password, age, gender, phone, address, city, country } = req.body;

  const patientExists = await Patient.findOne({ email });

  if (patientExists) {
    res.status(400);
    throw new Error('patient already exists');
  }

  const patient = await Patient.create({
    name,
    email,
    password,
    age,
    gender,
    phone,
    address,
    city,
    country,
  });

  if (patient) {
    generateToken(res, patient._id);

    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      dateofbirth: patient.dateofbirth,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      city: patient.city,
      state: patient.state,
    });
  } else {
    res.status(400);
    throw new Error('Invalid patient data');
  }
});

// @desc    Logout patient / clear cookie
// @route   POST /api/patients/logout
// @access  Public
const logoutPatient = (req: any, res: any) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private
const getPatientProfile = asyncHandler(async (req: any, res: any) => {
  const patient = await Patient.findById(req.patient._id);
  console.log(`Patient id: ${req.patient._id}`);
  if (patient) {
    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      dateofbirth: patient.dateofbirth,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      city: patient.city,
      state: patient.state,
    });
  } else {
    res.status(404);
    throw new Error('patient not found');
  }
});

// @desc    Update patient profile
// @route   PUT /api/patients/profile
// @access  Private
const updatePatientProfile = asyncHandler(async (req: any, res: any) => {
  const patient = await Patient.findById(req.patient._id);

  if (patient) {
    patient.name = req.body.name || patient.name;
    patient.email = req.body.email || patient.email;
    patient.dateofbirth = req.body.age || patient.dateofbirth;
    patient.gender = req.body.gender || patient.gender;
    patient.phone = req.body.phone || patient.phone;
    patient.address = req.body.address || patient.address;
    patient.city = req.body.city || patient.city;
    patient.state = req.body.country || patient.state;

    if (req.body.password) {
      patient.password = req.body.password;
    }

    const updatedpatient = await patient.save();

    res.json({
      _id: updatedpatient._id,
      name: updatedpatient.name,
      email: updatedpatient.email,
      dateofbirth: updatedpatient.dateofbirth,
      gender: updatedpatient.gender,
      phone: updatedpatient.phone,
      address: updatedpatient.address,
      city: updatedpatient.city,
      state: updatedpatient.state,
    });
  } else {
    res.status(404);
    throw new Error('patient not found');
  }
});
export {
  authPatient,
  registerPatient,
  logoutPatient,
  getPatientProfile,
  updatePatientProfile,
};
