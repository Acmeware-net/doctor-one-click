import React, { useState, useEffect } from 'react'
import { useGetDoctorsQuery } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor } from '../slices/doctorSlice';
import Table from './Table';

const Doctors = () => {
  console.log('Doctors component loaded')
  const [doctors, setDoctors] = useState([]);
  let  { data } = useGetDoctorsQuery();
  const dispatch = useDispatch();

  // const doctors = data().unwrap();
  // data = data.length-1;
  // let doctorsList = null;
  if(data !== undefined){
    if (Array.isArray(data.doctors)) {
      console.log('data.doctors[0]:', data.doctors); // Log the doctors array
    } else {
      console.error('data.doctors is not an array:', data.doctors);
  }
}
if(data === undefined){
  console.log('data is undefined')
}
useEffect(() => {
  console.log('useEffect runs')
  if(data !== undefined){
    console.log('data is defined')
    dispatch(addDoctor(data.doctors));
    setDoctors(data.doctors)
    }
  }, [data, dispatch]);
  

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Experience', accessor: 'experience' },
    { Header: 'Specialization', accessor: 'specialization' },
    { Header: 'Address', accessor: 'address' },
    { Header: 'Status', accessor: 'status' },
  ];


  return (
    <>
    <div className='text-xl m-4'>Doctors Nearby</div>

    <div id='map' className='p-5'></div>
    <Table columns={columns} data={doctors}/>
    </>
  )
}


export default Doctors