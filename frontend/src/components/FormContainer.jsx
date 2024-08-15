
const FormContainer = ({ children }) => {
  return (
    <div>
      <div className='justify-content-md-center mt-5'>
        <div xs={12} md={6} className='card p-5'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
