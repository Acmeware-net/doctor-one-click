import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import store from './store';
import App from './App';
import Home from './screens/Home';
import Login from './screens/Login';
import PatientLogin from './screens/PatientLogin';
import Register from './screens/Register';
import RegisterPatient from './screens/RegisterPatient';
import Profile from './screens/Settings';
import Dashboard from './screens/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Patients from './screens/Patients';
import Doctors from './screens/Doctors';
import Checkups from './screens/Checkups';
import Messages from './screens/Messages';
import Appointments from './screens/Appointments';
import Settings from './screens/Profile';
import ErrorElement from './components/ErrorElement'
import Privacy from './screens/Privacy';
import Terms from './screens/Terms';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login/patient' element={<PatientLogin />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register/patient' element={<RegisterPatient />} />
      <Route path='/terms' element={<Terms />}/>
      <Route path='/privacy' element={<Privacy />}/>
      <Route path='' element={<PrivateRoute />} errorElement={<ErrorElement />} >
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path="doctors" element={<Doctors />} />
          <Route path="patients" element={<Patients />} />
          <Route path="checkups" element={<Checkups />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </ Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);

