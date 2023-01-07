import React, {useState, useEffect} from 'react'

import {TiTick} from "react-icons/ti"
import {ImCross} from "react-icons/im"
import { toast } from 'react-toastify';

import {useDispatch, useSelector} from "react-redux"
import { getAllMyPosts, purchaseRequestAccept, purchaseRequestDecline } from '../../../Actions/User'


const RequestList = ({post}) => {

    const dispatch = useDispatch()
    const {loading, message} = useSelector(state=> state.myPosts)

    const [showModal, setShowModal] = useState(false)
    const [action, setAction] = useState(null)
    const [person, setPerson] = useState(null)

    const handleAccept = () => {
        dispatch(purchaseRequestAccept(post._id, person._id))
        dispatch(getAllMyPosts())
        setShowModal(false)
    }

    const handleReject = () => {
        dispatch(purchaseRequestDecline(post._id, person._id))
        dispatch(getAllMyPosts())
        setShowModal(false)
    }

    useEffect(()=>{

        if(message){
          toast.success(message)
          setShowModal(false)
          dispatch({type:"clearMessage"})
        }
    
      },[message, dispatch, setShowModal])

    // console.log(post)

  return (
    <div>
        <p className='text-2xl font-semibold my-8'>Puchase request for {post.title} : </p>
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Sr no.
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Image
                </th>
                <th className="p-3 w-24 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  E-mail
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Accept?
                </th>
              </tr>
            </thead>

            

            {post.purchaseRequest.map((person,i) => (
              <tbody key={person._id} className="divide-y divide-gray-100 ">
                <tr className="bg-white justify-center">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <img src={person.avatar.url} alt={person.name} className="h-[6rem] w-[6rem] object-cover rounded-full" />
                  </td>
                  <td className="p-3 text-md font-semibold text-gray-700 whitespace-nowrap">
                    {person.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {person.email}
                  </td>
                  <td className="p-3 text-sm flex mt-9 items-center text-gray-700 whitespace-nowrap">
                        <button disabled={loading} onClick={()=>{setPerson(person); setShowModal(true); setAction("accept")}} className="hover:cursor-pointer">
                            <TiTick className="h-4 mt-1 text-2xl text-green-700"/>
                        </button>
                        <button disabled={loading} onClick={()=>{setPerson(person); setShowModal(true) ;setAction("reject")}} className="hover:cursor-pointer mx-6">
                            <ImCross className="h-4 mt-1 text-red-700" />
                        </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {post.purchaseRequest.length===0?<div className="text-center my-4">No purchase requests yet..</div>:<></>}
        </div>

        {/* Mobile View */}
        <div className="flex flex-col w-full md:hidden">
          {post.purchaseRequest.map((person,i)=> (
            <div key={i} className="bg-white space-y-3 p-4 my-2 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <img src={person.avatar.url} alt={person.name} className="h-[4rem] w-[4rem] object-cover sm:h-[6rem] sm:w-[6rem] rounded-full" />
                <div className="flex flex-col text-left w-[60%] text-sm">
                    <div className="text-sm text-left font-medium text-black">
                    {person.name}
                    </div>
                    <div className="text-gray-500 text-left ">
                    {"E-mail: "}{person.email}
                    </div>
                </div>
              </div>
              <div className="flex h-7 items-center justify-center">
                <button disabled={loading} onClick={()=>{setPerson(person); setShowModal(true) ;setAction("accept")}} className="hover:cursor-pointer">
                    <TiTick className="h-4 mt-1 text-2xl text-green-600"/>
                </button>
                <button disabled={loading} onClick={()=>{setPerson(person); setShowModal(true) ;setAction("reject")}} className="hover:cursor-pointer  mx-4">
                    <ImCross className="h-4 mt-1 text-red-700" />
                </button>
              </div>
            </div>
          ))}
          {post.purchaseRequest.length===0?<div className="text-center my-4">No purchase requests yet..</div>:<></>}
        </div>

        {/* Accept or reject request */}
        {showModal && 
            <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm bg-gray-800 flex justify-center items-center'>
                <div className='bg-white p-6'>
                <p>{`${action==="accept"? "Accept" : "Reject"} purchase request from ${person.name}?`}</p>
                <div className='flex mt-3'>
                    <button onClick={action==="accept"? handleAccept: handleReject} className='flex items-center hover:cursor-pointer'>Yes <TiTick className='ml-2 text-green-700'/></button>
                    <p onClick={()=>setShowModal(false)} className='flex items-center hover:cursor-pointer ml-4'>Cancel <ImCross className='ml-2 text-red-700'/></p>
                </div> 
                </div>
            </div>
        }
    </div>
  )
}

export default RequestList