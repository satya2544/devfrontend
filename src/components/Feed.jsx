import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'

const Feed = () => {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch()

    const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed" ,{withCredentials: true});
      dispatch(addFeed(res.data));
    }catch (err){
       console.log(err)
    }
 
  }

   useEffect(() => {
     getFeed();
   },[])

  if(!feed) return;

  if(feed.length <= 0) return <h1 className='flex justify-center my-10'>No new users found</h1>


  return (
    feed && ( <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
      <h1 className='text-pink-300 text-6xl my-auto animate-sliding-text font-bold'>Start <span className='text-pink-400gi'>  Something </span>Epic...</h1>
    </div>)
   
  )
}

export default Feed
