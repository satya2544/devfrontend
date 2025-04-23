import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';


const EditProfile = ({user}) => {
        const [firstName, setFirstName] = useState(user.firstName);
        const [lastName, setLastName] = useState(user.lastName);
        const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
        const [age, setAge] = useState(user.age || "");
        const [gender, setGender] = useState(user.gender || "");
        const [about, setAbout] = useState(user.about || "");
        const [error,setError] = useState("");
        const dispatch = useDispatch();
        const [showToast,setShowToast] = useState(false);
const saveProfile = async () => {
    try{
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

       dispatch(addUser(res?.data?.data))
       const i = setInterval(()=>{
        setShowToast(false)
       },2000)
       setShowToast(true)
    } catch (err){
       setError(err.response.data)
    }
}

 return (
    <>
    <div className='flex justify-center my-20'>
    <div className='flex justify-center m-10 mx-10'>

     <div className="card card-border bg-base-content w-96">
     <div className="card-body">
     <h2 className="card-title justify-center text-white">Edit Profile</h2>

      <div>
      <label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text py-3 text-white">First Name</span>
    
  </div>
  <input type="text"
   value={firstName}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setFirstName(e.target.value)} />
 
</label>
<label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text py-3 text-white">Last Name</span>
    
  </div>
  <input type="text"
   value={lastName}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setLastName(e.target.value)}/>
 
  </label>

  <label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text py-3 text-white">Photo Url</span>
    
  </div>
  <input type="text"
   value={photoUrl}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setPhotoUrl(e.target.value)} />
 
</label>
<label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text py-3 text-white">Age</span>
    
  </div>
  <input type="text"
   value={age}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setAge(e.target.value)} />
 
</label>
<label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text py-3 text-white">Gender</span>
    
  </div>
  <input type="text"
   value={gender}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setGender(e.target.value)} />
 
</label>
<label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text py-3 text-white">About</span>
    
  </div>
  <input type="text"
   value={about}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setAbout(e.target.value)} />
 
</label>

      </div>
      <p className='text-red-500'>{error}</p>
      <div className='card-actions justify-center'>
         <button className='btn btn-primary' onClick={saveProfile}>Save Profile</button>
      </div>
    
  </div>
</div>
    </div>
    <UserCard user={{firstName, lastName, photoUrl, age, gender, about}}/>
    </div>

    {/* toast pop */}
 
 {showToast && (  <div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>Profile Saved Succesfully.</span>
  </div>

</div>)}
  

    </>
    
  )

}

export default EditProfile
