'use client'

import { useContext } from "react";
// import { StoreContext } from "@/app/context";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { toast } from 'react-toastify';
import { StoreContext } from "@/app/context";
const AddToCart = ({book}) => {
  const {cartData, setCartData} = useContext(StoreContext);

  const handleCart = (e, reason) => {
    e.preventDefault();
    const newData = {...book, type: reason};
    setCartData([...cartData,newData]);
    toast.success(`Added ${newData.title} to the cart`,{
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT
    })
}


  
  return (
    <div className="flex justify-around">
      <button 
        className="bg-purple-500  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick = {(event) => handleCart(event, 'Buy')}>
        <ShoppingCartIcon className="w-5 mr-0.5 inline" /> Add To Cart
      </button>
    </div>
  );
};

export default AddToCart;