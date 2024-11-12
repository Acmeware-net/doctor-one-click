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
import Appointments from './screens/Appointments';
import Doctors, { loader as doctorsLoader } from './screens/Doctors';
import FindDoctor,{ loader as findDoctorLoader } from './components/FindDoctor';
import Checkups from './screens/Checkups';
import Messages from './screens/Messages';
import Settings from './screens/Profile';
import ErrorElement from './components/ErrorElement';
import Privacy from './screens/Privacy';
import Terms from './screens/Terms';
import './index.css';

import * as Sentry from "@sentry/react";

// Sentry init
Sentry.init({
  dsn: "https://22ef7190abf4e70b0abd1f4e03e3d0a8@o4508269792002048.ingest.us.sentry.io/4508269794885632",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// React router
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
                // loader: doctorsLoader,
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
// 
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);

