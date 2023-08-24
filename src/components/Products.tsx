import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts, STATUSES } from '../store/productSlice';
import { incrementTrigger } from '../store/triggerSlice';
import { RootState } from '../store/store';

const Products: React.FC = () => {
    const dispatch = useDispatch();
    const { data: products, status } = useSelector((state: RootState) => state.product);

    const [expandedDescriptionId, setExpandedDescriptionId] = useState<number | null>(null);
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleAdd = (product: any) => {
        dispatch(add(product));
        dispatch(incrementTrigger());
    };

    const toggleDescription = (productId: number) => {
        if (expandedDescriptionId === productId) {
            setExpandedDescriptionId(null);
        } else {
            setExpandedDescriptionId(productId);
        }
    };

    if (status === STATUSES.LOADING) {
        return <h2>Loading....</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }

    return (
        <div className="productsWrapper">
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h5> RS {product.price * 80}</h5>
                    {/* <div className="description">
                        <p>
                            {expandedDescriptionId === product.id
                                ? product.description
                                : ` Description :- ${product.description?.slice(0, 50)}...`}
                        </p>
                        {product.description?.length > 50 && (
                            <button onClick={() => toggleDescription(product.id)}>
                                {expandedDescriptionId === product.id ? 'Read Less' : 'Read More'}
                            </button>
                        )}
                    </div> */}
                    <button onClick={() => handleAdd(product)} className="btn">
                        Add to cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Products;
