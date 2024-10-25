import React, { useState, useEffect } from 'react'
import { useGetDoctorsQuery } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor } from '../slices/doctorSlice';
import { Outlet, Link, useLoaderData } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GiConsoleController } from 'react-icons/gi';



const Doctors = () => {
  // console.log('Doctors component loaded')
  const [doctors, setDoctors] = useState([]);
  let { data } = useGetDoctorsQuery();
  console.log(`inside Doctors() data -> ${data}`);
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
    const lat = userInfo.position.lat;
    const lng = userInfo.position.lng;
    console.log(`lat -> ${lat} lng -> ${lng}`)
    const center = { lat: 37.43238031167444, lng: -122.16795397128632 };
    console.log(`lat -> ${lat}`)
    const map = new Map(document.getElementById("map"), {
    zoom: 11,
    center,
    mapId: "4504f8b37365c3d0",
    });
    console.log(` doctor inside initMap -> ${data.doctors}`)
    
    for (const doctor of properties) {
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
    
    function buildContent(doctor) {
    const content = document.createElement("div");
    
    content.classList.add("doctor");
    content.innerHTML = `
    <div class="icon">
    <i aria-hidden="true" class="fa fa-icon fa-${doctor._id}" title="${doctor.name}"></i>
    <span class="fa-sr-only">${doctor.gender}</span>
    </div>
    <div class="details">
    <div class="price">${doctor.license}</div>
    <div class="address">${doctor.address}</div>
    <div class="features">
    <div>
      <i aria-hidden="true" class="fa fa-check fa-lg bed" title="bedroom"></i>
      <span class="fa-sr-only">bedroom</span>
      <span>${doctor.status}</span>
    </div>
    <div>
      <i aria-hidden="true" class="fa fa-status fa-lg bath" title="bathroom"></i>
      <span class="fa-sr-only">bathroom</span>
      <span>${doctor.specialization}</span>
    </div>
    <div>
      <i aria-hidden="true" class="fa fa-dollar fa-lg size" title="size"></i>
      <span class="fa-sr-only">size</span>
      <span>${doctor.experience} </span>
    </div>
    </div>
    </div>
    `;
    return content;
    }

    const properties = [
    {
    address: "215 Emily St, MountainView, CA",
    description: "Single family house with modern design",
    price: "Dr. Laiba",
    type: "home",
    bed: "Appointments today: 7",
    bath: "Status: Busy",
    size: "300 per hour",
    position: {
    lat: 37.50024109655184,
    lng: -122.28528451834352,
    },
    },
    {
    address: "108 Squirrel Ln &#128063;, Menlo Park, CA",
    description: "Townhouse with friendly neighbors",
    price: "Dr. Hina",
    type: "building",
    bed: "Appointments today: 4",
    bath: "Status: Not in office",
    size: "260 per hour",
    position: {
    lat: 37.44440882321596,
    lng: -122.2160620727,
    },
    },
    {
    address: "100 Chris St, Portola Valley, CA",
    description: "Spacious warehouse great for small business",
    price: "Dr. Ahmad",
    type: "warehouse",
    bed: 4,
    bath: 4,
    size: 800,
    position: {
    lat: 37.39561833718522,
    lng: -122.21855116258479,
    },
    },
    {
    address: "98 Aleh Ave, Palo Alto, CA",
    description: "A lovely store on busy road",
    price: "Dr. Arsalan",
    type: "store-alt",
    bed: 2,
    bath: 1,
    size: 210,
    position: {
    lat: 37.423928529779644,
    lng: -122.1087629822001,
    },
    },
    {
    address: "2117 Su St, MountainView, CA",
    description: "Single family house near golf club",
    price: "Dr. Faiza",
    type: "home",
    bed: "Appointments today: 2",
    bath: "Status: Away",
    size: "230 per hour",
    position: {
    lat: 37.40578635332598,
    lng: -122.15043378466069,
    },
    },
    {
    address: "197 Alicia Dr, Santa Clara, CA",
    description: "Multifloor large warehouse",
    price: "Dr. Arifa",
    type: "warehouse",
    bed: "Appointments today: 5",
    bath: "Status: online",
    size: "180 per hour",
    position: {
    lat: 37.36399747905774,
    lng: -122.10465384268522,
    },
    },
    {
    address: "700 Jose Ave, Sunnyvale, CA",
    description: "3 storey townhouse with 2 car garage",
    price: "$ 3,850,000",
    type: "building",
    bed: 4,
    bath: 4,
    size: 600,
    position: {
    lat: 37.38343706184458,
    lng: -122.02340436985183,
    },
    },
    {
    address: "868 Will Ct, Cupertino, CA",
    description: "Single family house in great school zone",
    price: "$ 2,500,000",
    type: "home",
    bed: 3,
    bath: 2,
    size: 100,
    position: {
    lat: 37.34576403052,
    lng: -122.04455090047453,
    },
    },
    {
    address: "655 Haylee St, Santa Clara, CA",
    description: "2 storey store with large storage room",
    price: "$ 2,500,000",
    type: "store-alt",
    bed: 3,
    bath: 2,
    size: 450,
    position: {
    lat: 37.362863347890716,
    lng: -121.97802139023555,
    },
    },
    {
    address: "2019 Natasha Dr, San Jose, CA",
    description: "Single family house",
    price: "$ 2,325,000",
    type: "home",
    bed: 4,
    bath: 3.5,
    size: 500,
    position: {
    lat: 37.41391636421949,
    lng: -121.94592071575907,
    },
    },
    ];
    
    initMap();

  return (
    <>
      <div className='text-xl m-4'>Doctors Nearby</div>
      <div>
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
      <div id='map' className='m-8 p-5 ml-11 w-auto'></div>
          <div>
            <Outlet />


          </div>
    </>
  )
}




export default Doctors;