import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import "./product.css"
import Cart from '../pages/Cart';
import { add, remove, clearCart } from '../store/cartSlice';
import { decrementTrigger, incrementTrigger, decrementTriggerAll, resetTrigger } from '../store/triggerSlice';
import { useSelector, useDispatch } from 'react-redux';
import CartPayment from './CartPayment';
import { addToOrderHistory } from '../store/orderHistorySlice';
import { clearOrderHistory } from '../store/orderHistorySlice'; // Import the new action
import { RootState } from '../store/store';
import Footer from './Footer';
import Navbar from './Navbar';

const Stripe: React.FC = () => {
  const dispatch = useDispatch();
      const products = useSelector((state: RootState) => state.cart);
// console.log("products",products);

  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const navigate = useNavigate()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet, so do nothing.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      // setPaymentError(error.message);
      setPaymentError(error.message ?? 'An error occurred while processing your payment.');

      setPaymentSuccess(false);
    } else {
      setPaymentError(null);
      setPaymentSuccess(true);
      
      dispatch(clearCart());
      dispatch(resetTrigger());
      dispatch(addToOrderHistory(products));

      setTimeout(() => {

        navigate('/home')
      }, 3000);
    }
  };
  // const handleAllRemove = () => {
  //   dispatch(clearCart()); 
  //   dispatch(resetTrigger()); 
  // };
  return (
    <>
      {/* <CartPayment /> */}
<Navbar/>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <CartPayment />
                </div>
                <div style={{ flex: 1, marginLeft: '2rem' }}>

    <h3 className='heading' style={{marginLeft:"45%"}}>Payment</h3>
      <div className="payment-container">
        <form onSubmit={handleSubmit}>
          <div className="card-element">
            <CardElement />
          </div>
          <button className="submit-button" type="submit" disabled={!stripe} >
            Pay
          </button>
        </form>
        {paymentError && <p className="error-message">{paymentError}</p>}
        {paymentSuccess && <p className="success-message">Payment successful!</p>}
      </div>
      </div>
      </div>
      {/* <button className="btn" onClick={handleAllRemove}>Remove All</button> */}
<Footer/>
    </>
  );
};

// Replace 'your_stripe_publishable_key' with your actual publishable API key
const stripePromise = loadStripe('pk_test_51NjeeiSFMlusWFXD1grQpwSoFFkKCnrrYKoP5aB2umqpqPiLJZLyO671Qfn9YQrr8U7P4k2e4awAzZZLxKvB98lz001fwwRhPo');

const App: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <Stripe />
    </Elements>
  );
};

export default App;
