import React from 'react'
import Navbar from './Navbar'
import { setAddress } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
const OrderHistory = () => {
  const orderHistory = useSelector(setAddress);

  const orderedItem = orderHistory.payload.orderHistory[1]
  return (
    <div>
      <Navbar />
      <h1>Order History</h1>
      {orderedItem?.map((cartItem: any) => {


        return (
          <>
            <p>{cartItem?.title}</p>
            <p>Qty-{cartItem?.quantity}</p>
            <p>Rate:-{cartItem?.rating?.rate}</p>
            <img src={cartItem?.image} alt='image' />

          </>
        )

      })}

    </div>
  )
}

export default OrderHistory
