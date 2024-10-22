import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { useGetDoctorByIdQuery } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';

export async function loader({ params }) {
    console.log(`inside FindDoctor component and doctor id -> ${param.id}`)
    const doctor = useGetDoctorByIdQuery(params.id);
    console.log(`inside FindDoctor component and doctor -> ${doctor}`)
    return { contact };
  }

const FindDoctor = () => {
    const { doctor } = useLoaderData();
  return (
    <div>FindDoctor {doctor.name}</div>
  )
}

export default FindDoctor