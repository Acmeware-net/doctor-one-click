import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { doctorInfo } = useSelector((state) => state.auth);

  if (doctorInfo === undefined) {
    // Optionally, you could show a loading spinner or a message here if needed
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-opacity-50 rounded-full animate-spin"></div>
        <span className="sr-only">Checking authentication...</span>
      </div>
    );
  }

  return doctorInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
