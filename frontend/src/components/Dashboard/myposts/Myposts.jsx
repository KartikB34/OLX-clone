import React from 'react'
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import {useDispatch, useSelector} from "react-redux"
import { getAllMyPosts } from '../../../Actions/User';
import ProductDetails from './ProductDetails';
import Loader from '../../Loader';

const Myposts = () => {

  const dispatch = useDispatch();
  const [state, setState] = useState(0);
  const [post, setPost] = useState();

  const {loading, posts, error} = useSelector(state => state.allMyPosts)
  console.log(posts)

  useEffect(()=>{
    dispatch(getAllMyPosts())

    if(error){
      toast.error(error);
      dispatch({
        type:"clearError"
      })
    }

  },[error, dispatch])

  return (loading? <Loader /> :
    <div className='mt-6'>
      <p className='font-bold text-2xl ml-2 md:ml-4'>{state? "Product details :" : "My posts: "}</p>

      {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-4'> */}
      {state === 0 && <div className='flex flex-wrap items-center justify-center'>

        {posts && posts.map((post,i)=>(
          <div 
            className='relative shadow-lg rounded-md md:h-[348px] md:w-[282px] m-6 hover:cursor-pointer' 
            onClick={()=>{setState(1); setPost(post)}}
            key={i}
          >
            <div className={`absolute ${post.sold? "bg-green-300" : "bg-yellow-700 text-white"} shadow-lg top-2 left-3 rounded-full px-3 py-2 flex justify-center items-center`}>
              {post.sold? "Sold" : "Unsold"}
            </div>

            <img 
              src={post.image.url} 
              alt={post.title} 
              className='rounded-md h-[348px] w-[282px] object-cover' 
            />
            {/* <p className={`absolute bottom-0 ${showModal? "" : "z-10"} bg-white w-full px-1 text-center py-2 rounded-b-md`}>{movie.title}</p> */}
            <div className={`absolute bottom-0 ${state===1? "" : "z-10"} bg-white w-full px-3 text-left py-2 rounded-b-md`}>
              <p className='text-lg font-semibold'>₹ {post.price}</p>
              <p>Item name: {post.title}</p>
            </div>
          </div>
        ))}

        {posts && posts.length===0 && <p className='flex items-center justify-center text-3xl h-[70vh]'>You've not made any post yet..</p>}

      </div>}

      {state===1 && <ProductDetails setState={setState} post={post} />}
      {/* <ToastContainer /> */}
    </div>
  )
}

export default Myposts
