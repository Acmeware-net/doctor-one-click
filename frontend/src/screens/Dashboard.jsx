import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
// import { useDoctorsMutation } from '../slices/doctorsApiSlice';
import { logout } from '../slices/authSlice';
// import { addDoctor } from '../slices/doctorSlice';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Dashboard = () => {
  // console.log('Dashboard component loaded')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [logoutApiCall] = useLogoutMutation();
  // Calling all doctor's list from backend
  // const [doctorsApiCall] = useDoctorsMutation();
  // const allDoctors =  doctorsApiCall();
  // console.log(`inside Dashboard component and ran useGetDoctorsQuery and doctors are ${allDoctors}`)
  const { userInfo } = useSelector((state) => state.auth);
  // Getting all doctor's list state from doctor reducer
  const { doctorsInfo } = useSelector((store) => store.doctor);
  // console.log(`Dashboard component and doctorsInfo are ${doctorsInfo}`)
  // Saving doctor's list new state to addDoctor reducer method
  // dispatch(addDoctor(doctors));
  // Handle logout request
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
        <div className='bg-gray-100  p-5 row-span-10 grid-rows-5 font-bold tracking-widest'>
          <Link to="/dashboard"><div className='border-b-4 hover:opacity-50 p-5 my-3 font-sans rounded-md'>Dashboard</div></Link>
          { (userInfo.type === 'doctor') ? <Link to="/dashboard/patients"><div className=' border-b-4 p-5 my-3 font-sans rounded-md'>Patients</div></Link> : 
          <Link to="/dashboard/doctors"><div className='hover:opacity-50 active:bg-indigo-400 border-b-4 p-5 my-3 font-sans rounded-md'>Doctors</div></Link>}
          <Link to="/dashboard/checkups"><div className='hover:opacity-50 border-b-4 p-5 my-3 font-sans rounded-md'>Checkups</div></Link>
          <Link to="/dashboard/appointments"><div className='hover:opacity-50 border-b-4 p-5 my-3 font-sans rounded-md'>Appointments</div></Link>
          <Link to="/dashboard/messages"><div className='hover:opacity-50 border-b-4 p-5 my-3 font-sans rounded-md'>Messages</div></Link>
          <Link to="/dashboard/profile"><div className='hover:opacity-50 border-b-4 p-5 my-3 font-sans rounded-md'>Profile</div></Link>
          <Link to="/dashboard/settings"><div className='hover:opacity-50 border-b-4 p-5 my-3 font-sans rounded-md'>Settings</div></Link>
          <div onClick={logoutHandler} className='hover:opacity-50 border-b-4 p-5 my-3 font-sans rounded-md cursor-pointer'>Logout </div>
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
