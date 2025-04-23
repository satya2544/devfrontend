import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status === 401){
        navigate("/login")
      }
     
      console.log(err)
    }
  };

  useEffect(()=>{
      fetchUser();
     },[])
  return (
    <div> 
     <NavBar/>
     <Outlet/>
     <Footer/>
    </div>
  )
}

export default Body
