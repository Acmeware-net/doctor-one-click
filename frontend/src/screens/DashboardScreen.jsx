import React from 'react'
import Card from '../components/Card';


const DashboardScreen = () => {
  return (
    <div>
      <div className='text-center font-mono text-2xl antialiased hover:subpixel-antialiased font-semibold text-teal-200'>Dashboard</div>
      <div class="grid grid-cols-4 gap-4 rounded-lg ">
      
      <Card type="Pending"/>
      <Card type="Canceled"/>
      <Card type="Completed"/>
      <Card type='Total' className=''/>
    </div> 
    </div>
  )
}

export default DashboardScreen
