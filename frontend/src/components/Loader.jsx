import React from 'react'
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-[70vh]'>
      <Oval color="#003979" height={100} width={100} />
    </div>
  )
}

export default Loader
