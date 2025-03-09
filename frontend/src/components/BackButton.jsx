import React from 'react'
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
        <Link to={destination}
        className='text-gray-600 hover:text-gray-900'>
            <BsArrowLeft className='text-2xl'/>
        </Link>
    </div>
  )
}

export default BackButton