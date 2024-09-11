import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { doctorInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-gray-800 text-white z-100">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className=" font-bold">
          AppOintment
        </Link>
       
        <div className="flex space-x-4">
          {doctorInfo ? (
            <>
              <div className="flex items-center space-x-2">
                <Link to="/dashboard" className="hover:text-gray-300">
                <span className="text-sm font-medium">Welcome back</span>
                <span className="text-sm font-medium"> {doctorInfo?.name}</span>
                </Link>
                  <img src='../../public/doc.jpg' className=' w-10 h-10 rounded-full' />
                <Link to="/profile" className="hover:text-gray-300">
                  <span className='border rounded-md p-2'>Profile</span>
                </Link>
                <button
                  onClick={logoutHandler}
                  className="hover:text-gray-300 focus:outline-none border rounded-md p-2"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center space-x-2 hover:text-gray-300">
                <span className='border rounded-lg p-2'>Sign In</span>
              </Link>
              <Link to="/register" className="flex items-center space-x-2 hover:text-gray-300">
                <span className='border rounded-lg p-2 hover:bg-grey-300'>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
