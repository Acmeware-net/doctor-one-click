import { useState, useEffect } from 'react';

import Loader from '../components/Loader';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const [doctor, setDoctor] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [register, { isLoading }] = useRegisterMutation();
  
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(`email: ${email} password: ${password} isDoctor: ${doctor} terms: ${terms} privacy: ${privacy}`);
    if (doctor) {
      console.log(`user is doctor`)
    } else {
      console.log(`user is patient`)
    }

    if (((password !== confirmPassword) || !terms || !privacy || (email === ''))) {
      setError('Cannot submit incomplete form');
      return;
    }


    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ email, password, doctor }).unwrap();
        console.log(`res is ${res}`)
        dispatch(setCredentials({ ...res }));
        navigate('/dashboard');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className='flex justify-center font-poppins bg-green-sage'>
      <div className=" mt-10 max-w-6xl  bg-gray-100 p-10" >
        <h1 className='text-2xl text-gray-800 text-center mb-5'>Sign up</h1>
        <form onSubmit={submitHandler}
          className='bg-white p-10 rounded-lg  shadow-md   animate-fadeIn'>
          <div className="grid grid-cols-2 gap-8">


            <div className='my-1' id='email'>
              <label className='block mb-2 text-gray-600 font-medium'>Email Address</label>
              <input
                type='email'
                placeholder='e.g. username@domain.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={() => { setError(''); }}
                className=' p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
              /><br />
              {(email === '') && <span className='text-red-700'>Email address cannot be empty</span>}
            </div>

            <div className='my-1' id='usertype'>
              <label htmlFor='usertype'>Account Type</label><br />
              <input
                type='radio'
                id='doctor'
                value='doctor'
                name='usertype'
                className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 border-2'
                onChange={(e) => setDoctor(!e.target.checked)}
                checked

              />
              <label htmlFor='doctor'> Doctor   </label>

              <input
                type='radio'
                id='patient'
                value='patient'
                name='usertype'
                onChange={(e) => setDoctor(e.target.checked)}
                className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
              />
              <label htmlFor='patient'>   Patient</label>
            </div>
            <div className='my-1' id='password'>
              <label className='block mb-2 text-gray-600 font-medium'>Password</label>
              <input
                type='password'
                placeholder='e.g. 1q#rT$7uZ'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClick={() => { setError(''); }}
                className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
              />
              <br />
              {(password === '') && <span className='text-red-700'>Password cannot be empty</span>}
            </div>

            <div className='my-1' id='confirmPassword'>
              <label className='block mb-2 text-gray-600 font-medium'>Confirm Password</label>
              <input
                type='password'
                placeholder='e.g. repeat password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onClick={() => { setError(''); }}
                className='p-2 rounded-md border border-gray-300 mb-5 transition-all focus:border-blue-400 focus:shadow-md focus:shadow-blue-200'
              />
              <br />
              {(password !== confirmPassword) && <span className='text-red-700'>Passwords do not match</span>}
            </div>



          </div>
          <div className=''><div className='text-lg py-2'>Consent and Privacy</div>
            <input
              type='checkbox'
              id='terms'
              onChange={(e) => setTerms(e.target.checked)}
              onClick={() => { setError(''); }}
            />
            <label htmlFor='terms'> I hereby agree to the <span className='text-cyan-500 hover:opacity-50'><Link to="/terms">terms of service</Link></span> by the use of this software.</label>
            <br />
            <input
              type='checkbox'
              id='privacy'
              onChange={(e) => setPrivacy(e.target.checked)}
              onClick={() => { setError(''); }}
            />
            <label htmlFor='privacy'> I hereby agree to the <span className='text-cyan-500 hover:opacity-50'><Link to="/privacy">privacy policy</Link></span> by the use of this software.</label>
          </div>
          <button type='submit' className='w-full p-2 rounded-md font-semibold text-lg bg-blue-400 text-white font-medium hover:bg-green-500 transition-all mt-5'>
            Register
          </button>
          {error !== '' && <span className='text-red-700'>Cannot submit incomplete form</span>}
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

export default Register;
