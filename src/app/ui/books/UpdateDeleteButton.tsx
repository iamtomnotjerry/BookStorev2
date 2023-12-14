'use client'
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';


const UpdateDeleteButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleCart = (e:any) => {
  e.preventDefault();
  
}

  
  return (
    <div className="flex">
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
        onClick = {(event) => handleCart(event)}>
         Update 
      </button>
      <button 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
        onClick = {(event) => handleCart(event)}>
         Delele 
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
              <XCircleIcon  className="w-6 h-6" />
            </button>
            
          </div>
        </div>
      )}
    </div>
  )};
;

export default UpdateDeleteButton;