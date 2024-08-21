const Loader = () => {
  return (
    <div
      className="w-24 h-24 border-4 border-t-4 border-blue-500 border-opacity-50 rounded-full animate-spin mx-auto my-8"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
