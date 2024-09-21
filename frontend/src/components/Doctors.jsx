import React, { useState, useEffect } from 'react'
import { useGetDoctorsQuery } from '../slices/usersApiSlice';

const Doctors = () => {
  console.log('component loaded')
let  { data } = useGetDoctorsQuery();
const [doctors, setDoctors] = useState('');
  // const doctors = data().unwrap();
  // data = data.length-1;
  // let doctorsList = null;
  if(data !== undefined){
    console.log('data:', data); // Log the entire data object
    if (Array.isArray(data.doctors)) {
      console.log('data.doctors:', data.doctors); // Log the doctors array
    } else {
      console.error('data.doctors is not an array:', data.doctors);
  }

}
console.log('doctors ', doctors)
  
  useEffect(() => {
    console.log('useEffect runs')
    if(data !== undefined){
    setDoctors(data.doctors)
    }
  }, [data]);
  
  return (
    <>
    <div className='text-xl'> Available Doctors</div>
    <div>{doctors && doctors.map((doctor)=>{
      <li>{doctor.name}</li>
    })}</div>
    </>
  )
}

export default Doctors