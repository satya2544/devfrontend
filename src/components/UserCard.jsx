import axios from 'axios';
import React from 'react'
import { BASE_URL } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
const UserCard = ({ user }) => {
    const {_id, firstName, lastName, photoUrl, age, gender, about} = user;
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try{
          const res = await axios.post(
            BASE_URL + "/request/send/" + status + "/" + userId, {},
             {withCredentials: true}
          );
          dispatch(removeUserFromFeed(userId));

        } catch (err) {

        }
    }

  return (
    <div>
        <div className="card bg-zinc-300 w-96 shadow-sm m-20">
            <figure>
            <div>
              <img
            src={photoUrl}
            alt="Profile"
            className="w-full h-full object-cover object-center"
             />
      </div>
            </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
            <div className="card-actions justify-end">
            <button className="btn btn-secondary" onClick={()=> handleSendRequest("ignored", _id)} >Ignore</button>
            <button className="btn btn-primary" onClick={()=> handleSendRequest("interested", _id)}>Interested</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UserCard
