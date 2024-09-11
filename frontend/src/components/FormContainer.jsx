const FormContainer = ({ children }) => {
  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-md bg-blue-50 p-6 rounded-1g shadow-md ml-x-5 px-10">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
