import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';



  const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // console.log(`email: ${email} password: ${password} isDoctor: ${isDoctor} isPatient: ${isPatient}`)
      // if(isPatient){
      //   console.log(`user is patient`)
      // }else{
      //   console.log(`user is doctor`)
      // }
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
     <div className="flex justify-around font-poppins bg-green-babypowder items-center">
      <div className= "mt-10 w-full bg-gray-100 p-10 align-middle">
        <h1 className="text-2xl text-gray-800 text-center mb-5">Sign In</h1>

        <form
          onSubmit={submitHandler}
          className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm"
        >
          <div className="mb-5">
            <label className="block mb-2 text-gray-600 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-600 focus:ring focus:ring-blue-200 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-600 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-600 focus:ring focus:ring-blue-200 transition"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-2 bg-blue-400 text-white rounded-md font-semibold text-lg hover:bg-green-500 transition"
          >
            Sign In
          </button>
        </form>

        {isLoading && <Loader />}

        <div className="py-2 text-center">
          <div>
            New User? <Link to="/register" className="text-blue-400">Register</Link>
          </div>
        </div>
      </div>
      <div><img src='doctor-patient-heart-sign.webp' alt='doctor patient heart symbol' className='w-full p-5' /></div>
    </div>
  );
};

export default Login;
