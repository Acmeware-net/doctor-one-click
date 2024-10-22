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
import FindDoctor,{ loader as findDoctorLoader } from './components/FindDoctor';
import Checkups from './screens/Checkups';
import Messages from './screens/Messages';
import Appointments from './screens/Appointments';
import Settings from './screens/Profile';
import ErrorElement from './components/ErrorElement'
import Privacy from './screens/Privacy';
import Terms from './screens/Terms';
import './index.css';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        index:true,
        element: <Home />,
      },
      {
        path:'/login',
        element: <Login />,
      },
      {
        path:'/login/patient',
        element: <PatientLogin />,
      },
      {
        path:'/register',
        element: <Register />,
      },
      {
        path:'/register/patient',
        element: <RegisterPatient />,
      },
      {
        path:'/terms',
        element: <Terms />,
      },
      {
        path:'/privacy',
        element: <Privacy />,
      },
      {
        path:'',
        element: <PrivateRoute />,
        errorElement: <ErrorElement />,
        children:[
          {
            path: '/dashboard',
            element: <Dashboard />,
            children:[
              {
                path:'doctors',
                element: <Doctors />,
                children:[
                  {
                    path:"id/:id",
                    element: <FindDoctor />,

                  }
                ]
              },
              {
                path:'patients',
                element: <Patients />,
              },
              {
                path:'checkups',
                element: <Checkups />,
              },
              {
                path:'appointments',
                element: <Appointments />,
              },
              {
                path:'messages',
                element: <Messages />,
              },
              {
                path:'profile',
                element: <Profile />,
              },
              {
                path:'settings',
                element: <Settings />,
              },
            ]
          },
        ]
      },
    ]
  }
]

);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);

