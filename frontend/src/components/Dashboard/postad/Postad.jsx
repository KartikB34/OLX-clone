import React,{useState, useEffect} from 'react'

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import productImage from "../../../data/product.png"

import {useSelector, useDispatch} from "react-redux"
import { createNewPost } from "../../../Actions/Post";
import { loadUser } from "../../../Actions/User";

const Postad = () => {

    const dispatch = useDispatch();

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState(0);

    const handleImageChange = (e) => {
        const file = e.target.files[0]
    
        const reader = new FileReader()
        reader.readAsDataURL(file)
    
        reader.onload = () =>{
            if(reader.readyState===2){
                setImage(reader.result)
            }
        }
    };

    const{loading, error, message} = useSelector((state) => state.post)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(title==="" || image==="" || description==="" || category==="" || brand==="" || condition === ""){
            toast.error("Please fill all the details")
            return;
        }

        await dispatch(createNewPost(title, image, description, category, brand, condition, price))
        dispatch(loadUser())
        setImage(null)
        setBrand("")
        setCategory("")
        setCondition("")
        setPrice(0)
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({
                type:"clearError"
            })
        }
        if(message){
            toast.success(message);
            dispatch({
                type:"clearMessage"
            })
        }
    }, [error, message, dispatch])

  return (
    <div className='mt-8'>

        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center my-12'>

                <img src={image || productImage} alt="Product" className='h-[13rem] w-[13rem] mb-4 object-cover rounded-full' />
                <p className='my-2'>Upload Image: </p>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <input type='text' name='title' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Ad title / Item name" className='bg-gray-100 mt-4 w-64 p-2 flex items-center mb-3 outline-none text-sm flex-1' />

                <textarea type='text' name='desc' value={description} onChange={(e)=>setDesc(e.target.value)} rows={4}  placeholder="Item description" className='bg-gray-100 w-64 p-2 flex items-center mb-3 outline-none text-sm flex-1' />
                <input type='text' name='Category' value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Item Category" className='bg-gray-100 w-64 p-2 flex items-center mb-3 outline-none text-sm flex-1' />
                <input type='text' name='Brand' value={brand} onChange={(e)=>setBrand(e.target.value)} placeholder="Item Brand" className='bg-gray-100 w-64 p-2 flex items-center mb-3 outline-none text-sm flex-1' />
                <input type='text' name='Condition' value={condition} onChange={(e)=>setCondition(e.target.value)} placeholder="Item Condition" className='bg-gray-100 w-64 p-2 flex items-center mb-3 outline-none text-sm flex-1' />
                <input type='number' name='price' value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Item price in ₹" className='bg-gray-100 w-64 p-2 flex items-center mb-3 outline-none text-sm flex-1' />
                
                <button type='submit' disabled={loading} className={`border-2 border-gray-500 mt-8 text-gray-600 font-semibold ${loading? "bg-red-400" : ""} rounded-lg px-12 py-2 inline-block hover:bg-gray-500 hover:text-white hover:cursor-pointer`}>Add item</button>

        </form>            
    </div>
  )
}

export default Postad