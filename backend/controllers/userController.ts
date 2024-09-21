import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(`auth email is ${email}`);
  const user = await User.findOne({ email });
  // @ts-ignore
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    console.log(`user type : ${user.type}`)
    let doctor = null;
    let patient = null;
    let userId = user._id;
    if (user?.type === 'patient') {
      patient = await Patient.findOne({ userId });

    }
    if (user?.type === 'doctor') {
      doctor = await Doctor.findOne({ userId });
    }
    
    if (doctor) {

      res.json({
        name: doctor.name,
        email: doctor.email,
        dateofbirth: doctor.dateofbirth,
        gender: doctor.gender,
        phone: doctor.phone,
        address: doctor.address,
        city: doctor.address,
        state: doctor.state,
        zipcode: doctor.zipcode,
        type: user.type,
        experience: doctor.experience,
        specialization: doctor.specialization,
        bio: doctor.bio,
        headline: doctor.headline,
        license: doctor.license,
      });
    }

    if (patient) {

      res.json({
        name: patient.name,
        email: patient.email,
        dateofbirth: patient.dateofbirth,
        gender: patient.gender,
        phone: patient.phone,
        address: patient.address,
        city: patient.address,
        state: patient.state,
        zipcode: patient.zipcode,
        type: user.type,
      });
    }

  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: any, res: any) => {
  const { email, password, doctor } = req.body;
  // const { name, email, password, dateofbirth, gender, phone, address, city, state, zipcode, type,} = req.body;
  console.log(`User comes to register with email ${email} and password: ${password} and doctor ${doctor} `)
  const userExists = await User.findOne({ email });
  console.log(`user exists? ${userExists}`)

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  let type: string = "";
  doctor ? type = "doctor" : type = "patient";

  const user = await User.create({
    email,
    password,
    type,
  });

  const userId = user.id;
  let newUser = null;
  console.log(`New user registered with id ${user.id}`)
  if (!doctor) {
    console.log("inside isPatient block")
    let name = "patient"
    newUser = await Patient.create({
      userId,
      name,
      email
    });
  }
  else {
    console.log("inside isDoctor block")
    let name = "doctor"
    newUser = await Doctor.create({
      userId,
      name,
      email
    });
  }
  console.log(`newUser is ${newUser}`);

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: newUser.name,
      email: user.email,
      dateofbirth: newUser.dateofbirth,
      gender: newUser.gender,
      phone: newUser.phone,
      address: newUser.address,
      city: newUser.city,
      state: newUser.state,
      zipcode: newUser.zipcode,
      type: user.type,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req: any, res: any) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: any, res: any) => {
  console.log(`requested user by id: ${req.user._id}`)
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      // _id: user._id,
      // name: user.name,
      email: user.email,
      // dateofbirth: user.dateofbirth,
      // gender: user.gender,  
      // phone: user.phone,
      // address: user.address,
      // city: user.address,
      // state: user.state,
      // zipcode: user.zipcode,
      type: user.type,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req: any, res: any) => {
  console.log('Entering updateUserProfile method in userController...')
  console.log(req.body)
  const { _id, name, email, password, phone, address, gender, dateofbirth, city, state, zipcode, experience, specialization, bio, headline, image, license } = req.body;
  
  const user = await User.findById(req.user._id);


  if (user) {
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();

    const userId = req.user._id;
    let doctor = null;
    let patient = null;
    if (user?.type === 'patient') {
      console.log(`user type is patient`)
      patient = await Patient.findOne({ userId });
      if (patient) {
        patient.name = req.body.name || patient.name;
        patient.email = req.body.email || patient.email;
        patient.dateofbirth = req.body.dateofbirth || patient.dateofbirth;
        patient.gender = req.body.gender || patient.gender;
        patient.phone = req.body.phone || patient.phone;
        patient.address = req.body.address || patient.address;
        patient.city = req.body.city || patient.city;
        patient.state = req.body.state || patient.state;
        patient.zipcode = req.body.zipcode || patient.zipcode;
        patient.save();
      }
      console.log(`patient is ${patient}`);
    }
    if (user?.type === 'doctor') {
      console.log(`user type is doctor`)
      doctor = await Doctor.findOne({ userId });
      if (doctor) {
        doctor.name = req.body.name || doctor.name;
        doctor.email = req.body.email || doctor.email;
        doctor.dateofbirth = req.body.dateofbirth || doctor.dateofbirth;
        doctor.gender = req.body.gender || doctor.gender;
        doctor.phone = req.body.phone || doctor.phone;
        doctor.address = req.body.address || doctor.address;
        doctor.city = req.body.city || doctor.city;
        doctor.state = req.body.state || doctor.state;
        doctor.zipcode = req.body.zipcode || doctor.zipcode;
        doctor.experience = req.body.experience || doctor.experience;
        doctor.specialization = req.body.specialization || doctor.specialization;
        doctor.bio = req.body.bio || doctor.bio;
        doctor.headline = req.body.headline || doctor.headline;
        doctor.license = req.body.license || doctor.license;
        doctor.save();
      }
      console.log(`doctor is ${doctor}`);
    }
    console.log(`user to update is ${user}`)

    if (doctor) {

      res.json({
        name: doctor.name,
        email: doctor.email,
        dateofbirth: doctor.dateofbirth,
        gender: doctor.gender,
        phone: doctor.phone,
        address: doctor.address,
        city: doctor.address,
        state: doctor.state,
        zipcode: doctor.zipcode,
        type: user.type,
        experience: doctor.experience,
        specialization: doctor.specialization,
        bio: doctor.bio,
        headline: doctor.headline,
        license: doctor.license,
      });
    }

    if (patient) {

      res.json({
        name: patient.name,
        email: patient.email,
        dateofbirth: patient.dateofbirth,
        gender: patient.gender,
        phone: patient.phone,
        address: patient.address,
        city: patient.address,
        state: patient.state,
        zipcode: patient.zipcode,
        type: user.type,
      });
    }

  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
