import { useSelector } from 'react-redux';

const Card = (props:any) => {

  const { userInfo } = useSelector((state:any) => state.auth);
  
  return (
        <>
            <div className="border rounded-lg w-1000 h-500 bg-slate-500/50 px-10 py-5 font-sans text-xl text-center">{props.type}</div>
        </>
    );
};


const calculatePendingAppointments = () => {

};


export {calculatePendingAppointments};
export default Card;