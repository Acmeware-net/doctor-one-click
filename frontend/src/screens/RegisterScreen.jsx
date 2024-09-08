import { useState, useEffect } from 'react';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';



const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState(''); 
  const [gender, setGender] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [city, setCity] = useState(''); 
  const [country, setCountry] = useState(''); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password, age, gender, phone, address }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return(
    <div className='flex justify-center font-poppins'>
  <div className= " mt-10 max-w-6xl  bg-gray-100 p-10" >
    <h1 className='text-2xl text-gray-800 text-center mb-5'>Register</h1>
    <form onSubmit={submitHandler}
     className='bg-white p-10 rounded-lg  shadow-md   animate-fadeIn'>
     <div className="grid grid-cols-2 gap-8">
      <div className='my-1' id='name'>
        <label className='block mb-2 text-gray-600 font-medium'> Name</label>
        <input
          type='text'
          placeholder='e.g. John Doe'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>

      <div className='my-1' id='email'>
        <label className='block mb-2 text-gray-600 font-medium'>Email Address</label>
        <input
          type='email'
          placeholder='e.g. username@domain.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>

      <div className='my-1' id='password'>
        <label className='block mb-2 text-gray-600 font-medium'>Password</label>
        <input
          type='password'
          placeholder='e.g. t5X&#1qZ'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
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
      </div>
      

 <div className='my-1' id='age'>
        <label className='block mb-2 text-gray-600 font-medium'>Age</label>
        <input
          type='text'
          placeholder='e.g. 20'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>

      <div className='my-1' id='gender'>
        <label className='block mb-2 text-gray-600 font-medium'>Gender</label>
        <input
          type='text'
          placeholder='e.g. male'
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>

      <div className='my-1' id='phone'>
        <label className='block mb-2 text-gray-600 font-medium'>Phone Number</label>
        <input
          type='text'
          placeholder='e.g. +1 510 5469655'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>      

      <div className='my-1' id='address'>
        <label className='block mb-2 text-gray-600 font-medium'>Address</label>
        <input
          type='text'
          placeholder='e.g. Office 2 street 5 area downtown'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>

      <div className='my-1' id='city'>
        <label className='block mb-2 text-gray-600 font-medium'>City</label>
        <input
          type='text'
          placeholder='e.g. San Francisco'
          value={address}
          onChange={(e) => setCity(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>

      <div className='my-1' id='country'>
        <label className='block mb-2 text-gray-600 font-medium'>Country</label>
        <input
          type='text'
          placeholder='e.g. USA'
          value={address}
          onChange={(e) => setCountry(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
      </div>

     
      </div>

      <button type='submit' className='w-full p-2 rounded-md font-semibold text-lg bg-blue-400 text-white font-medium hover:bg-green-500 transition-all mt-3'>
        Register
      </button>

      {isLoading && <Loader />}
    </form>

    <div className='py-3 text-center'>
      <div>
        Already have an account? <Link to={`/login`} className='text-blue-400 font-medium '>Login</Link>
      </div>
    </div>
  </div>
</div>

  );
  
  
 
};

export default RegisterScreen;
