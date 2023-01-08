import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import close from "./close.svg"

import {TiTick} from "react-icons/ti"
import {ImCross} from "react-icons/im"
import { useDispatch, useSelector } from 'react-redux';
import { purchaseRequest } from '../../../Actions/User';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetails = ({post}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const {isAuthenticated}  = useSelector(state=>state.user)

  const [state, setState] = useState(0);
  const {loading, message} = useSelector(state=> state.myPosts)

  const handleRequest = () => {
    dispatch(purchaseRequest(post._id))
  }

  useEffect(()=>{
    if(post.sold === true){
      setState(-1)
    }

    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }

  },[post.sold, message, dispatch])
 
  return (
    <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm bg-gray-800 flex justify-center items-center'>
      <div className='bg-white p-6'>

        <div className='flex justify-between hover:cursor-pointer items-center my-3'>
            <p>Item name: {post.title}</p>
            <img src={close} alt="close" onClick={()=>{location.pathname===`/products/${post._id}`? navigate(`/products`): navigate('/dashboard/products')}} />
        </div>

        <div className='md:flex md:justify-between md:mt-8'>
            <img 
                src={post.image.url} 
                alt={post.title} 
                className="z-30 w-[100px] md:w-[266px] object-cover"
            />
            <div className='md:ml-6 mt-4 md:mt-0 md:max-w-[214px]'>
                <p>Owner: {post.owner.name}</p>
                <p>Price: ₹{post.price}</p>
                <p className='my-4'>Description: {post.description}</p>
                {/* <p className=''>{movie.vote_average}/10{" ("}{movie.vote_count}{" total votes)"}</p> */}
            </div>
        </div>

        {isAuthenticated && <div className='mt-6 flex flex-col items-center justify-center'>
          {state === 0 && <button onClick={()=>setState(1)} className='border-2 border-green-800 text-green-800 font-semibold rounded-full px-12 py-2 inline-block hover:bg-green-800 hover:text-white hover:cursor-pointer'>Purchase</button>}
          {state === 1 && 
            <div>
              <p>Send purchase request to owner?</p>
              <div className='flex mt-3'>
                <button onClick={handleRequest} disabled={loading} className='flex items-center hover:cursor-pointer'>Yes <TiTick className='ml-2 text-green-700'/></button>
                <p onClick={()=>setState(0)} className='flex items-center hover:cursor-pointer ml-4'>No <ImCross className='ml-2 text-red-700'/></p>
              </div>              
            </div>
          }
        </div>}
        
      </div>
    </div>
  )
}

export default ProductDetails
