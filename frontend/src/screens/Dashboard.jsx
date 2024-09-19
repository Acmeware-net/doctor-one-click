import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  
  const { userInfo } = useSelector((state) => state.auth);

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
    <div>
      {/* <div className='text-center font-mono text-5xl antialiased hover:subpixel-antialiased font-semibold text-green-nyanzadark py-7'>Dashboard</div> */}
      <div className="grid grid-cols-6 gap-4">
        <div className=' p-5 row-span-10 grid-rows-5 font-bold tracking-widest'>
          <Link to="/dashboard"><div className=' hover:hover:bg-blue-100 p-5 my-3 font-sans rounded-md'>Dashboard</div></Link>
          { (userInfo.type === 'doctor') ? <Link to="/dashboard/patients"><div className=' hover:bg-blue-100 p-5 my-3 font-sans rounded-md'>Patients</div></Link> : 
          <Link to="/dashboard/doctors"><div className=' hover:bg-blue-100 p-5 my-3 font-sans rounded-md'>Doctors</div></Link>}
          <Link to="/dashboard/checkups"><div className=' hover:bg-blue-100 p-5 my-3 font-sans rounded-md'>Checkups</div></Link>
          <Link to="/dashboard/appointments"><div className=' hover:bg-blue-100 p-5 my-3 font-sans rounded-md'>Appointments</div></Link>
          <Link to="/dashboard/profile"><div className=' hover:bg-blue-100 p-5 my-3 font-sans rounded-md'>Profile</div></Link>
          <Link to="/dashboard/settings"><div className=' hover:bg-blue-100 p-5 my-3 font-sans rounded-md'>Settings</div></Link>
          <div onClick={logoutHandler} className=' hover:bg-blue-100 p-5 my-3 font-sans rounded-md cursor-pointer'>Logout </div>
        </div>
        <div className='p-5 rounded-lg col-span-5 row-span-12'>
          <Outlet />
        </div>


      </div>
      {/* <Card type="Pending" />
      <Card type="Canceled" />
      <Card type="Completed" />
      <Card type='Total' className='' /> */}
    </div>
  )
}

export default Dashboard
