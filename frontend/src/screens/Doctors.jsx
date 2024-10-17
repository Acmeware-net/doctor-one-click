import React, { useState, useEffect } from 'react'
import { useGetDoctorsQuery } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor } from '../slices/doctorSlice';
import { Outlet, Link } from 'react-router-dom';
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

    <Table className={"w-2/3"}>
  <TableCaption>A list of nearby available doctors.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Name</TableHead>
      <TableHead className="w-[150px]">Specialization</TableHead>
      <TableHead className="w-[250px]">Address</TableHead>
      <TableHead className="text-left w-[100px]">Experience</TableHead>
      <TableHead className="w-[100px]">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {doctors && doctors.map((doctor)=>(
      <TableRow key={doctor.email}>
       {/* <Link to={'/'+doctor.email}> */}
          <TableCell className="font-medium">{doctor.name}</TableCell>
          <TableCell>{doctor.specialization}</TableCell>
          <TableCell>{doctor.address}</TableCell>
          <TableCell className="text-left">{doctor.experience}</TableCell>
          <TableCell>{doctor.status}</TableCell>
        {/* </Link>  */}
      </TableRow>
    ))}
    
  </TableBody>
</Table>
<Outlet/>
    </>
  )
}


export default Doctors;