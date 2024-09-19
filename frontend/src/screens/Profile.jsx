import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

 const [dateofbirth, setDateofbirth] = useState(''); 
 const [gender, setGender] = useState(''); 
 const [phone, setPhone] = useState(''); 
 const [address, setAddress] = useState(''); 
 const [city, setCity] = useState(''); 
 const [state, setState] = useState(''); 
 const [license, setLicense] = useState(''); 
 const [zipcode, setZipCode] = useState(''); 
 const [specialization, setSpecialization] = useState(''); 
 const [experience, setExperience] = useState(''); 
 const [headline, setHeadline] = useState(''); 
 const [bio, setBio] = useState(''); 
 const [image, setImage] = useState(''); 


  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  console.log(``)
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    console.log(`useEffect runs`);
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setAddress(userInfo.address);
    setGender(userInfo.gender);
    setCity(userInfo.city);
    setState(userInfo.state);
    setZipCode(userInfo.zipcode);
    setDateofbirth(userInfo.dateofbirth);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        console.log(`User comes to update profile, id: ${userInfo._id} and name: ${name} email ${email} and password : ${password}`)
        console.log(`User comes to update profile, phone: ${phone} and address: ${address} gender ${gender} and city : ${city}`)
        console.log(`User comes to update profile, state: ${state} and zipcode: ${zipcode} experience ${experience} and specialization : ${specialization}`)
        console.log(`User comes to update profile, bio: ${bio} and headline: ${headline} image ${image} and license : ${license}`)
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
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="flex justify-center mt-5">
    <div className="w-full max-w-md bg-blue-50 p-6 rounded-1g shadow-md ml-x-5 px-10">

      <h1 className='text-2xl text-gray-800 text-center mb-5'>Update {(userInfo.type === 'patient') ? <span>Patient</span> : <span>Doctor</span> } Profile</h1>

      <form onSubmit={submitHandler}>
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
          <label className='block mb-2 text-gray-600 font-medium'>Email Address</label>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          checked = {(gender === 'male')}
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
          checked = {(gender === 'female')}
        
        />
        <label htmlFor='male'>   female</label>
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

      {(userInfo.type === 'doctor') && <div className='my-1' id='license'>
        <label className='block mb-2 text-gray-600 font-medium'>Medical License No.</label>
        <input
          type='text'
          placeholder='e.g. #1234567890'
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>  }
      {(userInfo.type === 'doctor') &&
      <div className='my-1' id='specialization'>
        <label className='block mb-2 text-gray-600 font-medium'>Specialization</label>
        <input
          type='text'
          placeholder='e.g. Dentist'
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>}
      {(userInfo.type === 'doctor') &&
      <div className='my-1' id='experience'>
        <label className='block mb-2 text-gray-600 font-medium'>Experience</label>
        <input
          type='text'
          placeholder='e.g. 5 years'
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>}

     

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

      <div className='my-1' id='state'>
        <label className='block mb-2 text-gray-600 font-medium'>State</label>
        <input
          type='text'
          placeholder='e.g. California'
          value={state}
          onChange={(e) => setState(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
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
      {(userInfo.type === 'doctor') &&
        <div className='my-2' >
          <label className='block mb-2 text-gray-600 font-medium'>Headline</label>
          <input
            type='text'
            placeholder='Enter profile headline'
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
          ></input>
        </div>}

        {(userInfo.type === 'doctor') &&
        <div className='my-2' >
          <label className='block mb-2 text-gray-600 font-medium'>Bio</label>
          <input
            type='text'
            placeholder='Enter your bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
          ></input>
        </div>}

        <div className='my-1' id='password'>
        <label className='block mb-2 text-gray-600 font-medium'>Password</label>
        <input
          type='password'
          placeholder='e.g. 1q#rT$7uZ'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
        <br/>
        {(password==='') && <span className='text-red-700'>Password cannot be empty</span>}
      </div>

      <div className='my-1' id='confirmPassword'>
        <label className='block mb-2 text-gray-600 font-medium'>Confirm Password</label>
        <input
          type='password'
          placeholder='e.g. repeat password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
        <br/>
        {(password !== confirmPassword) && <span className='text-red-700'>Passwords do not match</span>}
      </div>    


        <button type='submit' variant='primary' className='w-full p-2 rounded-md font-semibold text-lg bg-blue-400 text-white font-medium hover:bg-green-500 transition-all mt-3'>
          Update
        </button>

        {isLoading && <Loader />}
      </form>
    </div>
    </div>
  );
};

export default Profile;
