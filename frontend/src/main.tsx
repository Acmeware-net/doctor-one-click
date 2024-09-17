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
import PatientRegister from './screens/PatientRegister';
import Profile from './screens/Profile';
import Dashboard from './screens/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login/patient' element={<PatientLogin />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/patient' element={<PatientRegister />} />
        <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />} />
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

