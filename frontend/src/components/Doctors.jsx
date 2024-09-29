import React, { useState, useEffect } from 'react'
import { useGetDoctorsQuery } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor } from '../slices/doctorSlice';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const Doctors = () => {
  // console.log('Doctors component loaded')
  const [doctors, setDoctors] = useState([]);
  let  { data } = useGetDoctorsQuery();
  const dispatch = useDispatch();

 
if(data === undefined){
  console.log('Doctor component and data is undefined')
}
useEffect(() => {
  // console.log('useEffect runs')
  if(data !== undefined){
    console.log('data is defined')
    dispatch(addDoctor(data.doctors));
    setDoctors(data.doctors)
    console.log(doctors)
    }
  }, [data, dispatch]);
  

  return (
    <>
    <div className='text-xl m-4'>Doctors Nearby</div>
    <div id='map' className='m-5 p-5'></div>

    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[200px]">Name</TableHead>
      <TableHead>Specialization</TableHead>
      <TableHead>Address</TableHead>
      <TableHead className="text-left">Experience</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {doctors && doctors.map((doctor)=>(
     <TableRow key={doctor.email}>
     <TableCell className="font-medium">{doctor.name}</TableCell>
     <TableCell>{doctor.specialization}</TableCell>
     <TableCell>{doctor.address}</TableCell>
     <TableCell className="text-left">{doctor.experience}</TableCell>
     <TableCell>{doctor.status}</TableCell>
   </TableRow> 
    ))}
    
  </TableBody>
</Table>

    </>
  )
}


export default Doctors;