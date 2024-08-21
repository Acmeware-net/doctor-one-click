
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
    <header className="container bg-slate-300">
      <nav  variant='dark' expand='lg' collapseOnSelect>
        <div className='flex flex-row space-x-400'>
          <Link to='/'>
            <div className='float-left'>Welcome back!</div>
          </Link>
          {/* <div aria-controls='basic-navbar-nav' /> */}
          <div id='basic-navbar-nav' className="float-right">
            <nav className='ms-auto flex flex-row px-4 space-x-4'>
              {userInfo ? (
                <>
                  <div title={userInfo.name} id='username'>:
                    <Link to='/profile'>
                      <div>Profile</div>
                    </Link>
                    <div onClick={logoutHandler}>
                      Logout
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to='/login'>
                    <div >
                      <FaSignInAlt /> Sign In
                    </div>
                  </Link>
                  <Link to='/register'>
                    <div >
                      <FaSignOutAlt /> Sign Up
                    </div>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
