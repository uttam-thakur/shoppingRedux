import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { incrementTrigger } from '../store/triggerSlice';
import { CircularProgress, Button, Typography, Grid, Paper, Box } from '@mui/material';
import { add } from '../store/cartSlice';
import Navbar from './Navbar';
import Footer from './Footer';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [productId]);

    const handleAddToCart = (product: any) => {
        if (product) {
            dispatch(add(product));
            dispatch(incrementTrigger());

        }
    };

    if (!product) {
        return (
            <div className="loaderContainer">
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <Box sx={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                <Paper elevation={3} sx={{ maxWidth: '800px', padding: '2rem' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={product.image} alt={product.title} style={{ width: '80%', maxHeight: '400px', objectFit: 'contain' }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom>
                                {product.title}
                            </Typography>
                            {/* <Typography variant="h6" color="textSecondary" gutterBottom>
                                Category: {product.category}
                            </Typography> */}
                            <Typography variant="h5" color="primary" gutterBottom>
                            ₹ {product.price * 80}/-
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {product.description}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)} >
                                Add to Cart
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <Footer />
        </>
    );
};

export default ProductDetail;
