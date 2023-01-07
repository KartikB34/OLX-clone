import {useSelector} from "react-redux"
import Loader from "../../Loader";

const Profile = () => {
  const {user, loading} = useSelector((state) => state.user);
  console.log(user)

  return ( loading? <Loader/> : user && 
    <div className='flex flex-col justify-center p-4 items-center'>
      <p className='text-3xl text-gray-700 font-semibold mb-12 border-b pb-2'>user details</p>
      <img src={user.avatar.url} alt="user_pic" className='h-[13rem] w-[13rem] md:w-[17rem] md:h-[17rem] object-cover border shadow-2xl rounded-full' />
      <p className='text-3xl font-bold my-6'>{user.name}</p>

      <div className='text-gray-700 text-sm md:text-base'>
        <p className='my-3 flex'><span className='font-semibold'>Email: </span><p className='px-4 mx-2 border-b border-white'>{user.email}</p> </p>
        <p className='my-3 flex'><span className='font-semibold'>Total posts: </span><p className='px-4 mx-2 border-b border-white'>{user.posts.length}</p> </p>
      </div>

    </div>
  )
}

export default Profile