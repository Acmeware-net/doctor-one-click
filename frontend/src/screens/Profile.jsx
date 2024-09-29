import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation, useDisableUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";


const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError ] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [image, setImage] = useState('');
  const [license, setLicense] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [profileupdated, setProfileUpdated] = useState(false);
  const [status, setStatus] = useState('');
  const [cityid, setCityId] = useState(0);
  const [stateid, setStateId] = useState(0);
  const [deleteAccount, setDeleteAccount ] = useState(false);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  console.log(``)
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const [disableProfile] = useDisableUserMutation();
  
  const disableAccount = () => {
    console.log('delete account clicked')
    disableProfile(userInfo);
  }
  useEffect(() => {
    console.log(`useEffect runs`);
    setProfileUpdated(false);
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setAddress(userInfo.address);
    setGender(userInfo.gender);
    setCity(userInfo.city);
    setState(userInfo.state);
    setZipCode(userInfo.zipcode);
    setDateofbirth(userInfo.dateofbirth);
    setSpecialization(userInfo.specialization);
    setExperience(userInfo.experience);
    setHeadline(userInfo.headline);
    setBio(userInfo.bio);
    setLicense(userInfo.license);
    setStatus(userInfo.status);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDeleteAccount(false);
    if (password !== confirmPassword ) {
      toast.error('Passwords do not match');
      setPasswordError('Passwords do not match')
      console.log(passwordError.toString())
    } else if (password === ''){
      setPasswordError('Passwords is empty')
      console.log(passwordError.toString())

    } 
    else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          gender,
          dateofbirth,
          phone,
          address,
          city,
          state,
          zipcode,
          experience,
          specialization,
          bio,
          headline,
          image,
          license,
          status,
        }).unwrap();
        if (res) {
          console.log(res);
          setProfileUpdated(true)
          setTimeout(()=>{setProfileUpdated(false)},2000)
        }
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="flex justify-center mt-5">
      <div className="w-full p-6 rounded-1g shadow-md ml-x-5 px-10">

        <h1 className='text-2xl text-gray-800 text-center mb-5'>Update Your Profile</h1>

        <form onSubmit={submitHandler}>
          <div className='flex flex-row justify-around'>
            <div>
              <div>Personal details</div>
              <div className='my-2' >
                <label className='block mb-2 text-gray-600 font-medium'>Name</label>
                <input
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                ></input>
              </div>


              <div className='my-2' >
                <label className='block mb-2 text-gray-600 font-medium'>Date of birth</label>
                <input
                  type='date'
                  value={dateofbirth}
                  onChange={(e) => setDateofbirth(e.target.value)}
                  className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                ></input>
              </div>

              <div className='my-2' >
                <label className='block mb-2 text-gray-600 font-medium'>Address</label>
                <input
                  type='text'
                  placeholder='Enter home/office address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                ></input>
              </div>

              <div className='my-2' >
                <label className='block mb-2 text-gray-600 font-medium'>Phone</label>
                <input
                  type='text'
                  placeholder='Enter phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                ></input>
              </div>


              <div className='my-1' id='gender'>
                <label className='block mb-2 text-gray-600 font-medium'>Gender</label>
                <input
                  type='radio'
                  id='male'
                  value='male'
                  name='gender'
                  onChange={(e) => setGender(e.target.value)}
                  className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                  checked={(gender === 'male')}
                />
                <label htmlFor='male'> male   </label>
                <span>       </span>
                <input
                  type='radio'
                  id='female'
                  value='female'
                  name='gender'
                  onChange={(e) => setGender(e.target.value)}
                  className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                  checked={(gender === 'female')}

                />
                <label htmlFor='male'>   female</label>
              </div>

              <div className='my-1' id='city'>
              <label className='block mb-2 text-gray-600 font-medium'>City</label>
              <input
                type='text'
                placeholder='e.g. San Francisco'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
              />
            </div>

            <div>
            <h6>State</h6>
            <StateSelect
                stateid={stateid}
                onChange={(e) => {
                    setStateId(e.id);
                }}
                placeHolder="Select State"
            />
            <h6>City</h6>
            <CitySelect
                cityid={cityid}
                stateid={stateid}
                onChange={(e) => {
                    setCityId(e);
                }}
                placeHolder="Select City"
            />
        </div>

            <div className='my-1' id='zipcode'>
              <label className='block mb-2 text-gray-600 font-medium'>Zip Code</label>
              <input
                type='text'
                placeholder='e.g. 98406'
                value={zipcode}
                onChange={(e) => setZipCode(e.target.value)}
                className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
              />
            </div>

              
            </div>
            {/* Personal details block finishes */}
            
            {(userInfo.type === 'doctor') &&
            <div>
              <div>Professional details</div>
               <div className='my-1' id='license'>
                <label className='block mb-2 text-gray-600 font-medium'>Medical License No.</label>
                <input
                  type='text'
                  placeholder='e.g. #1234567890'
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                />
              </div>
             
                <div className='my-1' id='specialization'>
                  <label className='block mb-2 text-gray-600 font-medium'>Specialization</label>
                  <input
                    type='text'
                    placeholder='e.g. Dentist'
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                  />
                </div>
             
                <div className='my-1' id='experience'>
                  <label className='block mb-2 text-gray-600 font-medium'>Experience</label>
                  <input
                    type='text'
                    placeholder='e.g. 5 years'
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                  />
                </div>
             
                <div className='my-2' >
                  <label className='block mb-2 text-gray-600 font-medium'>Headline</label>
                  <input
                    type='text'
                    placeholder='Enter profile headline'
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                  ></input>
                </div>

             
                <div className='my-2' >
                  <label className='block mb-2 text-gray-600 font-medium'>Bio</label>
                  <textarea
                    type='text'
                    rows="5" 
                    cols="33"
                    placeholder='Enter your bio'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                  ></textarea>
                </div>
            </div>}
            {/* Professional details end here */}
            


            <div>
              <div>Profile details</div>
              <div className='my-1' id='status'>
                <label className='block mb-2 text-gray-600 font-medium'>Status</label>
                <input
                  type='input'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                />
              </div>

              <div className='my-1' id='image'>
                <label className='block mb-2 text-gray-600 font-medium'>Upload Image</label>
                <input
                  type='file'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                />
              </div>
              <div className='my-2' >
                <label className='block mb-2 text-gray-600 font-medium'>Email Address</label>
                <input
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                ></input>
              </div>

              <div className='my-1' id='password'>
                <label className='block mb-2 text-gray-600 font-medium'>Password</label>
                <input
                  type='password'
                  placeholder='e.g. 1q#rT$7uZ'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={()=> setPasswordError('')}

                  className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                />
                <br />
                {/* {(password === '') && <span className='text-red-700'>Password cannot be empty</span>} */}
              </div>

              <div className='my-1' id='confirmPassword'>
                <label className='block mb-2 text-gray-600 font-medium'>Confirm Password</label>
                <input
                  type='password'
                  placeholder='e.g. repeat password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onClick={()=> setPasswordError('')}
                  className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
                />
                <br />
                {/* {(password !== confirmPassword) && <span className='text-red-700'>Passwords do not match</span>} */}
              </div>
            </div>
            {/* Profile details end here */}
            </div>
            <div className='text-center'>
            <button type='submit' className='text-center w-96 p-2 m-2 rounded-md font-semibold text-lg bg-blue-400 text-white font-medium hover:bg-blue-300 transition-all mt-3'>
              Update
            </button>
            <button onClick={(disableAccount)} className='text-center w-96 p-2 m-2 rounded-md font-semibold text-lg bg-red-400 text-white font-medium hover:bg-red-300 transition-all mt-3'>
              Delete My Account
            </button><br/>
            {profileupdated && <span className='text-teal-500 text-bold my-3'>Profile updated successfully</span>}
            {passwordError && <span className='text-red-700 text-bold my-3'>{passwordError.toString()}</span>}
            {isLoading && <Loader />}
            </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
