import { useState, useEffect } from 'react';

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
  const [dateofbirth, setDateofbirth] = useState(''); 
  const [gender, setGender] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [city, setCity] = useState(''); 
  const [state, setState] = useState(''); 
  const [license, setLicense] = useState(''); 
  const [zipcode, setZipCode] = useState(''); 
  const [terms, setTerms] = useState(false); 
  const [privacy, setPrivacy] = useState(false); 
  const [specialization, setSpecialization] = useState(''); 
  const [experience, setExperience] = useState(''); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { doctorInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (doctorInfo) {
      navigate('/dashboard');
    }
  }, [navigate, doctorInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        console.log(`name: ${name}, email: ${email}, password: ${password}, dob: ${dateofbirth}, gender: ${gender}, phone: ${phone}, address: ${address}, city: ${city}, state: ${state}, specialization: ${specialization}, experience: ${experience}, terms: ${terms}, privacy: ${privacy}`)
        const res = await register({ name, email, password, dateofbirth, gender, phone, address, city, state, license, specialization, experience}).unwrap();
        console.log(`res is ${res}`)
        dispatch(setCredentials({ ...res }));
        navigate('/dashboard');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return(
    <div className='flex justify-center font-poppins bg-green-sage'>
  <div className= " mt-10 max-w-6xl  bg-gray-100 p-10" >
    <h1 className='text-2xl text-gray-800 text-center mb-5'>Sign up as patient</h1>
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

      <div className='my-1' id='dob'>
        <label className='block mb-2 text-gray-600 font-medium'>Date of birth</label>
        <input
          type='date'
          value={dateofbirth}
          onChange={(e) => setDateofbirth(e.target.value)}
          className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        />
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
        />
        <label for='male'> male   </label>
        <span>       </span>
        <input
          type='radio'
          id='female'
          value='female'
          name='gender'
          onChange={(e) => setGender(e.target.value)}
          className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
        
        />
        <label for='male'>   female</label>
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
     
      

      </div>
      <div><h1>Consent and Privacy</h1>
        <input 
        type='checkbox'
        id='terms'
        onChange={(e) => setTerms(e.target.checked)}
        />
        <label for='cb-terms'> I hereby agree to the terms and conditions by the use of this software.</label>
        <br/>
        <input 
        type='checkbox'
        id='privacy'
        onChange={(e) => setPrivacy(e.target.checked)}
        />
        <label for='cb-privacy'> I hereby agree to the privacy policy by the use of this software.</label>
      </div>
      <button type='submit' className='w-full p-2 rounded-md font-semibold text-lg bg-blue-400 text-white font-medium hover:bg-green-500 transition-all mt-3'>
        Register
      </button>

      {isLoading && <Loader />}
    </form>

    <div className='py-3 text-center'>
      <div>
        Already have an account? <Link to={`/loginpatient`} className='text-blue-400 font-medium '>Login</Link>
      </div>
    </div>
  </div>
</div>

  );
  
  
 
};

export default RegisterScreen;
