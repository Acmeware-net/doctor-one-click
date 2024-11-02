import React, { useState, useEffect } from 'react'
import { useGetDoctorsQuery } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor } from '../slices/doctorSlice';
import { Outlet, Link, useLoaderData } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button, 
  Typography
} from "@mui/material/"

const Doctors = () => {
  // console.log('Doctors component loaded')
  const [doctors, setDoctors] = useState([]);
  let { data } = useGetDoctorsQuery();
  console.log(`inside Doctors() data -> ${data}`)
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  if (data === undefined) {
    console.log('Doctor component and data is undefined')
  } else {
    console.log(`First doctor id -> ${data.doctors[0]._id}`)
  }

  useEffect(() => {
    // console.log('useEffect runs')
    if (data !== undefined) {
      console.log('data is defined')
      dispatch(addDoctor(data.doctors));
      setDoctors(data.doctors)
      console.log(doctors)
    }
  }, [data, dispatch]);

  async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const lat = userInfo.location !== undefined || null ? userInfo.location.lat : 37.43238031167444;
    const lng = userInfo.location !== undefined || null ? userInfo.location.lng : -122.16795397128632;
    console.log(`lat -> ${lat} lng -> ${lng}`)
    const center = { lat: lat, lng: lng };
    const map = new Map(document.getElementById("map"), {
    zoom: 11,
    center,
    mapId: "4504f8b37365c3d0",
    });
    console.log(` doctor inside initMap -> ${data.doctors}`)
    
    for (const doctor of doctors) {
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
    map,
    content: buildContent(doctor),
    position: doctor.position,
    title: doctor.status,
    });
    
    AdvancedMarkerElement.addListener("click", () => {
    toggleHighlight(AdvancedMarkerElement, doctor);
    });
    }
    }
    function toggleHighlight(markerView, doctor) {
    if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
    } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
    }
    }
    
 

 
    
    initMap();

  return (
    <>
      <Typography variant="h3" component="h2" color="primary" align="center">
        Doctors Nearby
      </Typography>
      <div id='map' className='m-8 p-5 ml-11 w-auto'></div>

      <div>
        
      <Table className={"w-2/3"}>
        <TableHead>
          <TableRow>
            <TableCell className="w-[100px]">Name</TableCell>
            <TableCell className="w-[150px]">Specialization</TableCell>
            <TableCell className="w-[250px]">Address</TableCell>
            <TableCell className="text-left w-[100px]">Experience</TableCell>
            <TableCell className="w-[100px]">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors && doctors.map((doctor) => (
            <TableRow key={doctor.email}>
              <TableCell className="font-medium">{doctor.name}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{doctor.address}</TableCell>
              <TableCell className="text-left">{doctor.experience}</TableCell>
              <TableCell>{doctor.status}</TableCell>
              <Link to={'id/' + doctor._id}>
                <TableCell><Button>Appointment</Button></TableCell>
              </Link>
            </TableRow>
          ))}

        </TableBody>
      </Table>
      </div>
          <div>
            <Outlet />
          </div>
    </>
  )
}




export default Doctors;