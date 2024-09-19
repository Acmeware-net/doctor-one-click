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

    res.json({
      _id: user._id,
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
      city: newUser.address,
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
  console.log(`User comes to update profile, id: ${req.user._id} and name: ${req.user.name} email ${req.user.email} and password : ${req.user.password}`)
        
  const user = await User.findById(req.user._id);
  if (user?.type === 'patient'){
      console.log(`user type is patient`)
  }
  if (user?.type === 'doctor'){
    console.log(`user type is doctor`)
}
  console.log(`user to update is ${user}`)
  if (user) {
    // user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // user.dateofbirth = req.body.dob || user.dateofbirth;
    // user.gender = req.body.gender || user.gender;
    // user.phone = req.body.phone || user.phone;
    // user.address = req.body.address || user.address;
    // user.city = req.body.city || user.city;
    // user.state = req.body.country || user.state;
    // user.zipcode = req.body.zipcode || user.zipcode;
    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();
    const updatedUser = await user.save();

    res.json({
      // name: updatedUser.name,
      email: updatedUser.email,
      // dateofbirth: updatedUser.dateofbirth,
      // gender: updatedUser.gender,
      // phone: updatedUser.phone,
      // address: updatedUser.address,
      // city: updatedUser.address,
      // country: updatedUser.state,
      // zipcode: updatedUser.zipcode,
    });
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
