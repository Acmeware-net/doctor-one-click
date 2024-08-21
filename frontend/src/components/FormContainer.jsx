const FormContainer = ({ children }) => {
  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-md bg-lime-50 p-6 rounded-1g shadow-md">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
