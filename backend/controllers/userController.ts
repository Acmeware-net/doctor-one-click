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
    let userAccount = null;
    let userId = user._id;
    if (user?.type === 'patient') {
      userAccount = await Patient.findOne({ userId });

    }
    if (user?.type === 'doctor') {
      userAccount = await Doctor.findOne({ userId });
    }
if(userAccount){
    res.json({
      _id: user._id,
      name: userAccount.name,
      email: userAccount.email,
      dateofbirth: userAccount.dateofbirth,
      gender: userAccount.gender,
      phone: userAccount.phone,
      address: userAccount.address,
      city: userAccount.city,
      state: userAccount.state,
      zipcode: userAccount.zipcode,
      type: user.type,
    });
  }else{
    res.json({
      _id: user._id,
      email: user.email,
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
  console.log('Entering updateUserProfile method in userController...')
  console.log(req.body)
  const { _id, name, email, password, phone, address, gender, dateofbirth, city, state, zipcode, experience, specialization, bio, headline, image, license } = req.body;
  console.log(`User comes to update profile, id: ${_id} and name: ${name} email ${email} and password : ${password}`)
  console.log(`User comes to update profile, phone: ${phone} and address: ${address} gender ${gender} and city : ${city}`)
  console.log(`User comes to update profile, state: ${state} and zipcode: ${zipcode} experience ${experience} and specialization : ${specialization}`)
  console.log(`User comes to update profile, bio: ${bio} and headline: ${headline} image ${image} and license : ${license}`)

  const user = await User.findById(req.user._id);


  if (user) {
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();

    const userId = req.user._id;
    let updatedUser = null;

    if (user?.type === 'patient') {
      console.log(`user type is patient`)
      updatedUser = await Patient.findOne({ userId });
      if (updatedUser) {
        updatedUser.name = req.body.name || updatedUser.name;
        updatedUser.email = req.body.email || updatedUser.email;
        updatedUser.dateofbirth = req.body.dateofbirth || updatedUser.dateofbirth;
        updatedUser.gender = req.body.gender || updatedUser.gender;
        updatedUser.phone = req.body.phone || updatedUser.phone;
        updatedUser.address = req.body.address || updatedUser.address;
        updatedUser.city = req.body.city || updatedUser.city;
        updatedUser.state = req.body.state || updatedUser.state;
        updatedUser.zipcode = req.body.zipcode || updatedUser.zipcode;
        updatedUser.save();
      }
      console.log(`updatedUser is patient ${updatedUser}`);
    }
    if (user?.type === 'doctor') {
      console.log(`user type is doctor`)
      updatedUser = await Doctor.findOne({ userId });
      if (updatedUser) {
        updatedUser.name = req.body.name || updatedUser.name;
        updatedUser.email = req.body.email || updatedUser.email;
        updatedUser.dateofbirth = req.body.dateofbirth || updatedUser.dateofbirth;
        updatedUser.gender = req.body.gender || updatedUser.gender;
        updatedUser.phone = req.body.phone || updatedUser.phone;
        updatedUser.address = req.body.address || updatedUser.address;
        updatedUser.city = req.body.city || updatedUser.city;
        updatedUser.state = req.body.state || updatedUser.state;
        updatedUser.zipcode = req.body.zipcode || updatedUser.zipcode;
        updatedUser.experience = req.body.experience || updatedUser.experience;
        updatedUser.specialization = req.body.specialization || updatedUser.specialization;
        updatedUser.bio = req.body.bio || updatedUser.bio;
        updatedUser.headline = req.body.headline || updatedUser.headline;
        updatedUser.license = req.body.license || updatedUser.license;
        updatedUser.save();
      }
      console.log(`updatedUser is doctor ${updatedUser}`);
    }
    console.log(`user to update is ${user}`)
    if(updatedUser){
    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      dateofbirth: updatedUser.dateofbirth,
      gender: updatedUser.gender,
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.address,
      state: updatedUser.state,
      zipcode: updatedUser.zipcode,
    });
  }else {
    res.json({message:"User not found."})
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
