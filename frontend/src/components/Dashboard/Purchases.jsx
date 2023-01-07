import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { allMyPurchases } from '../../Actions/User'
import Loader from '../Loader'

const Purchases = () => {
    
    const dispatch = useDispatch()
    const {error, loading, posts} = useSelector(state => state.purchases)
    console.log(posts)

    useEffect(()=>{
        dispatch(allMyPurchases())

        if(error){
            toast.error(error)
            dispatch({type:"clearError"})
        }
    },[error, dispatch])

  return (loading? <Loader /> :
    <div className='p-4'>
        <p className='text-2xl py-3 font-semibold'>Your Purchases: </p>
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
                  Title
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Owner
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Price
                </th>
              </tr>
            </thead>

            

            {posts && posts.map((post,i) => (
              <tbody key={post._id} className="divide-y divide-gray-100 ">
                <tr className="bg-white justify-center">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <img src={post.image.url} alt={post.title} className="h-[6rem] w-[6rem] object-cover rounded-full" />
                  </td>
                  <td className="p-3 text-md font-semibold text-gray-700 whitespace-nowrap">
                    {post.title}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {post.owner.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    ₹{post.price}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {posts && posts.length===0?<div className="text-center my-4">No purchases yet..</div>:<></>}
        </div>

        {/* Mobile View */}
        <div className="flex flex-col w-full md:hidden">
          {posts && posts.map((post)=> (
            <div key={post._id} className="bg-white space-y-3 p-4 my-2 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <img src={post.image.url} alt={post.title} className="h-[4rem] w-[4rem] object-cover sm:h-[6rem] sm:w-[6rem] rounded-full" />
                <div className="flex flex-col text-left w-[60%] text-sm">
                    <div className="text-sm text-left font-medium text-black">
                    {post.title}
                    </div>
                    <div className="text-sm text-left my-1 font-medium text-black">
                    {"Owner: "}{post.owner.name}
                    </div>
                    <div className="text-gray-500 text-left ">
                    {"Price: ₹"}{post.price}
                    </div>
                </div>
              </div>
            </div>
          ))}
          {posts && posts.length===0?<div className="text-center my-4">No purchases yet..</div>:<></>}
        </div>
    </div>
  )
}

export default Purchases
