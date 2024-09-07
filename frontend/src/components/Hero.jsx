
const Hero = () => {
  return (
    <div className="py-5">
      <div className="flex justify-center">
        <div className="p-5 flex flex-col items-center bg-light bg-white w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">Your Health, Our Priority</h1>
          <p className="text-center text-gray-700 mb-4">
            Connect with top doctors and healthcare providers at your convenience.
          </p>
          <div className="flex space-x-4">
            <a href="/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </a>
            <a href="/register">
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Register
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

