import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, clearCart } from '../store/cartSlice';
import { decrementTrigger, incrementTrigger, decrementTriggerAll, resetTrigger } from '../store/triggerSlice';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store'; // Make sure to import RootState from your store file
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Typography, Grid, Paper, Box } from '@mui/material';

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

    const handleBuy = () => {
        console.log("buy");
        navigate('/address');

    };
    const handleBuyRedirect = () => {
        navigate('/home')
        console.log("redirect");

    }

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Cart</h3>
                <h3>Total Price - {totalPrice.toFixed(2)} RS</h3>
            </div>
            <div className="cartWrapper" style={{ padding: '2rem 0', display: 'flex', justifyContent: 'center' }}>
                <Paper elevation={3} sx={{ width: '80%', padding: '1rem' }}>
                    <Typography variant="h5" gutterBottom>
                        Your Cart
                    </Typography>
                    <Grid container spacing={3}>
    {products.map((product) => (
        <Grid item xs={12} key={product.id}>
            <Paper elevation={3} sx={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <img src={product.image} alt={product.title} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '1rem' }} />
                <div>
                    <Typography variant="h6" sx={{ marginRight: '1rem' }}>{product.title}</Typography>
                    <Typography variant="body1">₹ {product.price * product.quantity * 80}/-</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="outlined" size="small" onClick={() => handleRemoveQty(product.id)}>-</Button>
                    <Typography variant="body1" sx={{ margin: '0 0.5rem' }}>{product.quantity}</Typography>
                    <Button variant="outlined" size="small" onClick={() => handleAddQty(product)}>+</Button>
                    <Button variant="outlined" size="small" onClick={() => handleRemove(product.id, product.quantity)}>Remove</Button>
                </div>
            </Paper>
        </Grid>
    ))}
</Grid>
<br></br>

            {products.length == 0 ?
                <button className="btn" onClick={handleBuyRedirect}>
                    Please add item to cart first
                </button>
                :
                <button className="btn" onClick={handleBuy} >
                    Buy
                </button>
            }
                </Paper>
            </div>
            {/* <button className="btn" onClick={handleAllRemove}>Remove All</button> */}
            <Footer />
        </div>
    );
};

export default Cart;
