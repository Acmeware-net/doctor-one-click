import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

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
    <header className="bg-gray-battleship text-white z-100">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className=" font-bold font-sans text-2xl drop-shadow-xl">
          <Link to="/">
            AppOintment
          </Link>
        </div>
        <div className='flex gap-4'>
          <div>
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            className='p-2 rounded-lg w-300 drop-shadow-md'
          />
          </div>
          <div>
          <button className='bg-gray-battleship p-2 rounded-lg hover:bg-green-sage drop-shadow-lg transition duration-300'>Search</button>
          </div>
        </div>
        <div className="flex space-x-4">
          {userInfo ? (
            <>
              <div className="flex items-center space-x-2">
                <Link to="/dashboard" className="hover:text-gray-300">
                  <span className="text-sm font-medium">Welcome back</span>
                  <span className="text-sm font-medium"> {userInfo?.name}</span>
                </Link>
                <img src='./doc.jpg' className=' w-10 h-10 rounded-full' />
                
                <button
                  onClick={logoutHandler}
                  className="bg-gray-battleship p-2 rounded-lg hover:bg-green-sage drop-shadow-lg transition duration-300"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <><div className="bg-gray-battleship p-2 rounded-lg hover:bg-green-sage drop-shadow-lg transition duration-300">
              <Link to="/login" >
                <span className='p-2'>Sign In</span>
              </Link>
              </div>
              <div className='bg-gray-battleship p-2 rounded-lg hover:bg-green-sage drop-shadow-lg transition duration-300'>
              <Link to="/register" className="">
                <span className='rounded-lg p-2 '>Sign Up</span>
              </Link>
              </div>
              <div className='p-2'>Doctors</div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
