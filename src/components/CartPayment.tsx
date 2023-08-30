import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, clearCart } from '../store/cartSlice';
import { decrementTrigger, incrementTrigger, decrementTriggerAll, resetTrigger } from '../store/triggerSlice';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { setAddress } from '../store/authSlice';

interface ProductType {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

const CartPayment: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storedAddress = useSelector(setAddress);
    console.log("storedAddress", storedAddress);
    const addressDetails = storedAddress?.payload?.auth?.address
    const products = useSelector((state: RootState) => state.cart);
    const { username, password } = useSelector((state: RootState) => state.auth);

    console.log("product", products.length);
    console.log("auth", username);

    const handleRemove = (productId: number, productQuantity: number) => {
        dispatch(remove({ id: productId, quantity: productQuantity }));
        dispatch(decrementTriggerAll(productQuantity));
    };
    const handleAllRemove = () => {
        dispatch(clearCart()); // Clear all items from the cart
        dispatch(resetTrigger()); // Reset the trigger count
    };

    const handleRemoveQty = (productId: number) => {
        dispatch(remove({ id: productId, quantity: 1 }));
        dispatch(decrementTrigger());
    };

    const handleAddQty = (product: ProductType) => {
        dispatch(add(product));
        dispatch(incrementTrigger());
    };

    const totalPrice = products.reduce(
        (total, product) => total + product.price * product.quantity * 80, 0
    );

    const handleBuyRedirect = () => {
        navigate('/home')
        console.log("redirect");

    }

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Cart</h3>
                <h3>Total Price - ₹ {totalPrice.toFixed(2)}/-</h3>
            </div>
            <div className="cartWrapper" style={{ minHeight: '300px' }}>
                {products.map((product) => (
                    <>
                        <img src={product.image} alt={product.title} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '1rem' }} />
                        <div>
                            <h3 >{product.title}</h3>
                            <h3 >₹ {product.price * product.quantity * 80}/-</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button onClick={() => handleRemoveQty(product.id)}>-</button>
                            <h3 >{product.quantity}</h3>
                            <button onClick={() => handleAddQty(product)}>+</button>
                            <button onClick={() => handleRemove(product.id, product.quantity)}>Remove</button>
                        </div>

                    </>
                ))}
            </div>
            {products.length == 0 ?
                <button className="btn" onClick={handleBuyRedirect}>
                    Please add item to cart first
                </button>
                :
                <button className="btn" onClick={handleAllRemove}>Remove All Cart Items</button>
            }
            <h3>Billing Address</h3>
            <p>{addressDetails?.area},<span>{addressDetails?.landmark}</span></p>
            <p>{addressDetails?.locality},<span>{addressDetails?.pinCode}</span></p>
            <p>Ph :{addressDetails?.phoneNo}</p>
        </div>
    );
};

export default CartPayment;
