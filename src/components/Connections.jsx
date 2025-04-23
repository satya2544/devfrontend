import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
    const connections = useSelector((store) => store.connections)
    console.log(connections)
    const dispatch = useDispatch()
    const fetchConnections =  async () => {
        try{
          const res = await axios.get(BASE_URL + "/user/connections", {
            withCredentials:true,
          });
          console.log(res.data.data)  
          dispatch(addConnections(res?.data?.data))

        } catch (err){

        }
    };
    useEffect(() => {
       fetchConnections();
    },[]);
    if (!connections) return;
    
    if (connections.length === 0) return <h1>No Connections Found</h1>

  return (
    <div className='text-center my-10'>
    
      <h1 className='text-bold text-4xl'>Connections</h1>

      {connections.map((connection)=> {
        const {_id,firstName, lastName, photoUrl, age, gender, about} = connection;
        console.log(_id)
        return(
            <div key={_id} className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
      <div className="w-24 h-24 rounded-full overflow-hidden border shadow-md shrink-0 my-auto">
              <img
            src={photoUrl}
            alt="Profile"
            className="w-full h-full object-cover object-center"
             />
      </div>

                <div className='text-left mx-4'>
                    <h2 className='font-bold text-xl'>
                        {firstName + " " + lastName}
                    </h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                   
                </div>
                <Link to={"/chat/" + _id}><button className='btn btn-primary'>Chat</button></Link>
                
            </div>
            
        )
        
        
       
      })}
    </div>
  )
}

export default Connections
