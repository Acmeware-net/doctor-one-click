import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
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
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          Welcome back!
        </Link>
        <div className="flex space-x-4">
          {userInfo ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{userInfo.name}</span>
                <Link to="/profile" className="hover:text-gray-300">
                  <span>Profile</span>
                </Link>
                <button
                  onClick={logoutHandler}
                  className="hover:text-gray-300 focus:outline-none"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center space-x-2 hover:text-gray-300">
                <FaSignInAlt />
                <span>Sign In</span>
              </Link>
              <Link to="/register" className="flex items-center space-x-2 hover:text-gray-300">
                <FaSignOutAlt />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
