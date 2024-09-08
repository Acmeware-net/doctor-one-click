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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { doctorInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (doctorInfo) {
      navigate('/');
    }
  }, [navigate, doctorInfo]);

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

  return (
    <div className='registerform'>
    <FormContainer>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <div className='my-2' id='name'>
          <label>Name</label>
          <input
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className='my-2' id='email'>
          <label>Email Address</label>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className='my-2' id='age'>
          <label>Email Your Age</label>
          <input
            type='age'
            placeholder='Enter your age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></input>
        </div>

        <div className='my-2' id='gender'>
          <label>Email Your Gender</label>
          <input
            type='gender'
            placeholder='Enter your gender'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          ></input>
        </div>

        <div className='my-2' id='phone'>
          <label>Email Phone Number</label>
          <input
            type='phone'
            placeholder='Enter your phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>

        <div className='my-2' id='address'>
          <label>Email Your Home Address</label>
          <input
            type='address'
            placeholder='Enter your home address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>

        <div className='my-2' id='password'>
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className='my-2' id='confirmPassword'>
          <label>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

        <button type='submit' variant='primary' className='mt-3'>
          Register
        </button>

        {isLoading && <Loader />}
      </form>

      <div className='py-3'>
        <div>
          Already have an account? <Link to={`/login`}>Login</Link>
        </div>
      </div>
    </FormContainer>
    </div>
  );
};

export default RegisterScreen;
