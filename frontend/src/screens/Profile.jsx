import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateDoctorMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { doctorInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateDoctorMutation();

  useEffect(() => {
    setName(doctorInfo.name);
    setEmail(doctorInfo.email);
  }, [doctorInfo.email, doctorInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: doctorInfo._id,
          name,
          email,
          password,
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
    <FormContainer>
      <h1 className='text-2xl text-gray-800 text-center mb-5'>Update Profile</h1>

      <form onSubmit={submitHandler}>
        <div className='my-2' controlId='name'>
          <label className='block mb-2 text-gray-600 font-medium'>Name</label>
          <input
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
          ></input>
        </div>
        <div className='my-2' controlId='email'>
          <label className='block mb-2 text-gray-600 font-medium'>Email Address</label>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
          ></input>
        </div>
        <div className='my-2' controlId='password'>
          <label className='block mb-2 text-gray-600 font-medium'>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
          ></input>
        </div>

        <div className='my-2' controlId='confirmPassword'>
          <label className='block mb-2 text-gray-600 font-medium'>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
          ></input>
        </div>

        <button type='submit' variant='primary' className='w-full p-2 rounded-md font-semibold text-lg bg-blue-400 text-white font-medium hover:bg-green-500 transition-all mt-3'>
          Update
        </button>

        {isLoading && <Loader />}
      </form>
    </FormContainer>
  );
};

export default Profile;
