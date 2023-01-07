import React from 'react'
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { toast } from 'react-toastify';
import { getAllPosts } from '../../../Actions/Post';
import Loader from '../../Loader';
import ProductDetails from './ProductDetails';

const Products = () => {

  const dispatch = useDispatch();

  const {loading, posts, error} = useSelector(state => state.allpost)
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState();
  console.log(posts)

  useEffect(()=>{
    dispatch(getAllPosts())

    if(error){
      toast.error(error);
      dispatch({
        type:"clearError"
      })
    }

  },[error, dispatch])
  return (loading? <Loader /> :
    <div className='mt-6'>
      <p className='font-bold text-2xl ml-2 md:ml-4'>Recent posts:</p>

      {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-4'> */}
      <div className='flex flex-wrap items-center justify-center'>

        {posts && posts.map((post,i)=>(
          <div 
            className='relative shadow-lg rounded-md md:h-[348px] md:w-[282px] m-6 hover:cursor-pointer' 
            onClick={()=>{setShowModal(true); setPost(post)}}
            key={i}
          >
            <img 
              src={post.image.url} 
              alt={post.title} 
              className='rounded-md h-[348px] w-[282px] object-cover' 
            />
            {/* <p className={`absolute bottom-0 ${showModal? "" : "z-10"} bg-white w-full px-1 text-center py-2 rounded-b-md`}>{movie.title}</p> */}
            <div className={`absolute bottom-0 ${showModal? "" : "z-10"} bg-white w-full px-3 text-left py-2 rounded-b-md`}>
              <p className='text-lg font-semibold'>₹ {post.price}</p>
              <p>Item name: {post.title}</p>
            </div>
          </div>
        ))}

        {posts && posts.length===0 && <p className='flex items-center justify-center text-3xl h-[70vh]'>No posts found..</p>}

      </div>
      {showModal && <ProductDetails setShowModal={setShowModal} post={post} />}
      {/* {showModal && <MovieDetails setShowModal={setShowModal} movie={Movie} />} */}
      {/* <ToastContainer /> */}
    </div>
  )
}

export default Products
