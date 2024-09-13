import React from 'react'
import Card from '../components/Card';


const DashboardScreen = () => {
  return (
    <div>
      <div className='text-center font-mono text-5xl antialiased hover:subpixel-antialiased font-semibold text-teal-200'>Dashboard</div>
      <div class="grid grid-cols-6 border border-red gap-4">
        <div className='border border-black p-5 row-span-10 grid-rows-5'>
          <div class='bg-blue-100 hover:bg-blue-200 p-5 my-3 font-sans rounded-md'>Dashboard</div>
          <div class='bg-blue-100 hover:bg-blue-200 p-5 my-3 font-sans rounded-md'>Patients</div>
          <div class='bg-blue-100 hover:bg-blue-200 p-5 my-3 font-sans rounded-md'>Checkups</div>
          <div class='bg-blue-100 hover:bg-blue-200 p-5 my-3 font-sans rounded-md'>Appointments</div>
          <div class='bg-blue-100 hover:bg-blue-200 p-5 my-3 font-sans rounded-md'>Profile</div>
          <div class='bg-blue-100 hover:bg-blue-200 p-5 my-3 font-sans rounded-md'>Settings</div>
          <div class='bg-blue-100 hover:bg-blue-200 p-5 my-3 font-sans rounded-md'>Logout </div>
        </div>
        <div class='p-5 border border-green rounded-lg col-span-5 row-span-12'></div>
      

      </div>
      {/* <Card type="Pending" />
      <Card type="Canceled" />
      <Card type="Completed" />
      <Card type='Total' className='' /> */}
    </div>
  )
}

export default DashboardScreen
