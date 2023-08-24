import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, clearCart } from '../store/cartSlice';
import { decrementTrigger, incrementTrigger, decrementTriggerAll } from '../store/triggerSlice';
import { Link,useNavigate } from 'react-router-dom';
import { RootState } from '../store/store'; // Make sure to import RootState from your store file
import Navbar from '../components/Navbar';

// Define the type for your product
interface ProductType {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.cart);
    const { username, password } = useSelector((state: RootState) => state.auth);

    console.log("product", products.length);
    console.log("auth", username);

    const handleRemove = (productId: number, productQuantity: number) => {
        dispatch(remove({ id: productId, quantity: productQuantity }));
        dispatch(decrementTriggerAll(productQuantity));
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

    const handleBuy = () => {
        console.log("buy");
        navigate('/address');

    };
    const handleBuyRedirect = () =>{
        navigate('/home')
        console.log("redirect");
        
    }

    return (
        <div>
            <Navbar/>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Cart</h3>
                <h3>Total Price - {totalPrice.toFixed(2)} RS</h3>
            </div>
            <div className="cartWrapper">
                {products.map((product) => (
                    <div key={product.id} className="cartCard">
                        <img src={product.image} alt="" />
                        <h5>{product.title}</h5>
                        <h5>RS {product.price * product.quantity * 80}</h5>
                        <button className="btn" onClick={() => handleAddQty(product)}>+</button>
                        <h5>{product.quantity}</h5>
                        <button className='btn' onClick={() => handleRemoveQty(product.id)}>-</button>
                        <button
                            className="btn"
                            onClick={() => handleRemove(product.id, product.quantity)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            {products.length==0 ?
                <button className="btn" onClick={handleBuyRedirect}>
                    Please add item to cart first
                </button>
                :
                <button className="btn" onClick={handleBuy} >
                Buy
            </button>
}
        </div>
    );
};

export default Cart;
