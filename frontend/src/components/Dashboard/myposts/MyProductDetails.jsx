import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

import {MdDelete} from  "react-icons/md"
import {TiTick} from "react-icons/ti"
import {ImCross} from "react-icons/im"
import {BiArrowBack} from "react-icons/bi"

import {useDispatch, useSelector} from "react-redux"
import { deletePost } from '../../../Actions/Post';
import { getAllMyPosts } from '../../../Actions/User';
import { toast } from 'react-toastify';
import RequestList from './RequestList';
import { useNavigate } from 'react-router-dom';

const MyProductDetails = ({post}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [step, setStep] = useState(0);
  const {loading, message} = useSelector(state => state.myPosts)

  const deleteThePost = () =>{

    dispatch(deletePost(post._id));
    dispatch(getAllMyPosts())
    navigate("/dashboard/myposts")
    
  }

  useEffect(()=>{
    if(post.sold === true){
      setStep(-1)
    }

    if(message){
      toast.success(message);
    }

  },[post.sold, message])
 
  return (
      <div className='bg-white p-6'>

        <div onClick={()=>{navigate("/dashboard/myposts")}} className='flex text-2xl text-gray-500 hover:cursor-pointer items-center my-3'>
            <BiArrowBack className='mr-2' /> back
        </div>

        <div className='md:flex flex-col md:flex-row items-center justify-center md:mt-8'>
            <img 
                src={post.image.url} 
                alt={post.title} 
                className="w-[100px] md:w-[266px] md:mr-16 object-cover"
            />
            <div className='md:ml-6 mt-4 md:mt-0'>
                <p><b>Item name: </b>{post.title} <b>{post.sold?" (Sold)" : " (Unsold)"}</b></p>
                <p><b>Owner: </b>{post.owner.name}</p>
                {post.sold && <p><b>Buyer: </b>{post.buyer.name}</p>}
                <p><b>Price: </b>₹{post.price}</p>
                <p className='my-4'><b>Description: </b>{post.description}</p>
                {/* <p className=''>{movie.vote_average}/10{" ("}{movie.vote_count}{" total votes)"}</p> */}
                <div className='mt-6 flex flex-col items-center justify-center'>
                  {step === 0 && <button onClick={()=>setStep(1)} className='flex font-semibold rounded-full px-12 py-2 items-center hover:cursor-pointer'>Delete post <MdDelete className='text-red-400 ml-1'/></button>}
                  {step === 1 && 
                    <div>
                      <p>Are you sure you want to delete it?</p>
                      <div className='flex mt-3'>
                        <button onClick={deleteThePost} disabled={loading} className='flex items-center hover:cursor-pointer'>Yes <TiTick className='ml-2 text-green-700'/></button>
                        <p onClick={()=>setStep(0)} className='flex items-center hover:cursor-pointer ml-4'>No <ImCross className='ml-2 text-red-700'/></p>
                      </div>              
                    </div>
                  }
                </div>
            </div>

        </div>


        {/* Table content */}
        <RequestList  post={post}/>


      </div>
  )
}

export default MyProductDetails