import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const res = await axios.post(BASE_URL + "/login", {
            emailId,
            password,
          }, { withCredentials:true })
            console.log(res)
            dispatch(addUser(res.data));
            return navigate('/');
        } catch (err){
          setError(err?.response?.data || "Something went wrong")
          console.log(err);
        }
    }


    const handleSignUp = async () => {
      try {

        const res = await axios.post(
          BASE_URL + "/signup",
          {firstName, lastName, emailId, password},
          {withCredentials: true}
        );
        console.log(res.data)
        dispatch(addUser(res.data.data));
        return navigate("/profile");

      } catch (err) {
        setError(err?.response?.data || "Something went wrong")
      }
    }

  return (
    <div className='flex justify-center my-10'>
     <div className="card card-border bg-base-content w-96">
     <div className="card-body">
     <h2 className="card-title justify-center text-white">{isLoginForm ? "Login" : "Sign Up"}</h2>
      <div>
      {!isLoginForm && (<>
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
   onChange={(e) => setLasttName(e.target.value)} />
 
</label>

      </>)}
      






      <label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text py-3 text-white">Email Id</span>
    
  </div>
  <input type="text"
   value={emailId}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setEmailId(e.target.value)} />
 
</label>
<label className="form-control w-full max-w-xs py-4">
  <div className="label">
    <span className="label-text py-3 text-white">Password</span>
    
  </div>
  <input type="text"
   value={password}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setPassword(e.target.value)}/>
 
</label>
      </div>
      <p className='text-red-500'>{error}</p>
      <div className='card-actions justify-center'>
         <button className='btn btn-primary' onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "SignUp"}</button>
      </div>
      <p className='text-white cursor-pointer m-auto' onClick={() => setIsLoginForm((value) => !value)}>
        {isLoginForm
        ? "New User? Signup Here" : "Existing User? Login Here"}
      </p>
  </div>
</div>
    </div>
  )
}

export default Login
