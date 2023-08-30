import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { incrementTrigger } from '../store/triggerSlice';
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
                {/* <CircularProgress /> */}
                <p>loading...</p>
            </div>
        );
    }

    return (
        <><>
            <Navbar />
            <img src={product.image} alt={product.title} style={{ width: '80%', maxHeight: '400px', objectFit: 'contain' }} />
            <h3>  {product.title}</h3>

            <h3>
                ₹ {product.price * 80}/-
            </h3>
            <h3>
                {product.description}
            </h3>
            <button onClick={() => handleAddToCart(product)}>
                Add to Cart
            </button>
        </>
            <Footer />
        </>

    );
};

export default ProductDetail;
