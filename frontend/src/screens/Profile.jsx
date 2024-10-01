import React from 'react'
import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation, useDisableUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";


const Profile = () => {
  console.log('Settings component loaded')
  return (
    <div>Profile</div>
  )
}

export default Profile