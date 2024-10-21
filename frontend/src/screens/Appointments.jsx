import React from 'react'

const Appointments = () => {
  console.log('Appointments component loaded')

  return (
    <>
      <div>Appointments</div>

      <label htmlFor="start">Start date:</label>

      <input type="date" id="start" name="trip-start" defaultValue="2018-07-22" min="2018-01-01" max="2018-12-31" />

      <label htmlFor="appt">Choose a time for your meeting:</label>

      <input type="time" id="appt" name="appt" min="09:00" max="18:00" defaultValue="13:30" required />

      <small>Office hours are 9am to 6pm</small>

      <div className=''>
      Appoinments list
      </div>
    </>
  )
}

export default Appointments