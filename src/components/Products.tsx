import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts, STATUSES } from '../store/productSlice';

import { incrementTrigger } from '../store/triggerSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import Footer from './Footer';
import "./product.css"
import TextField from '@material-ui/core/TextField';
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

const Products: React.FC = () => {
    const dispatch = useDispatch();

    // Get the product data and status from the Redux store
    const { data: products, status } = useSelector((state: RootState) => state.product);


    // State for categories, selected category, pagination, and description expansion
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | ''>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(4);
    const [expandedDescriptionId, setExpandedDescriptionId] = useState<number | null>(null);

    // Handle adding a product to the cart
    const handleAdd = (product: any) => {
        dispatch(add(product));
        dispatch(incrementTrigger());
    };

    useEffect(() => {
        // Fetch categories
        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(data => setCategories(data));

        // Fetch products based on the selected category
        const apiURL = selectedCategory
            ? `https://fakestoreapi.com/products/category/${selectedCategory}`
            : 'https://fakestoreapi.com/products';

        dispatch(fetchProducts(apiURL));
    }, [dispatch, selectedCategory]);


    // Toggle description expansion
    const toggleDescription = (productId: number) => {
        if (expandedDescriptionId === productId) {
            setExpandedDescriptionId(null);
        } else {
            setExpandedDescriptionId(productId);
        }
    };
    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to the first page when changing items per page
    };
    // Calculate filtered products based on selected category
    const searchQuery = useSelector((state: RootState) => state.product.searchQuery);

    let filteredProducts: Product[] = products;
    if (searchQuery) {
        filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Calculate pagination indexes and current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);



    return (
        <>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', padding: "20px" }}>



                <label className="label">Select Category:</label>
                <select
                    className="select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as string)}
                >
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>


            </div>
            <div className="productsWrapper" style={{ minHeight: '500px' }}>
                {/* Conditional rendering based on data fetching status */}
                {status === STATUSES.LOADING ? (
                    <div className="loaderContainer">
                        <p>...loading</p>
                        {/* <CircularProgress /> Display normal loading spinner */}
                    </div>
                ) : (
                    /* Render products once data is fetched */
                    currentItems.map((product: Product) => (

                        <div className="card" key={product.id}>
                            {/* Render product details */}
                            <img src={product.image} className='imgProduct' alt="" />
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <h4 style={{ color: 'black' }}>{product.title}</h4>
                            </Link>
                            <h5>₹ {product.price * 80} /-</h5>
                            {/* Render product description */}
                            <div className="product">
                                <div className="description">
                                    <p>
                                        {typeof product.description === 'string'
                                            ? expandedDescriptionId === product.id
                                                ? product.description
                                                : `Description :- ${product.description.slice(0, 100)}...`
                                            : 'No description available'}
                                    </p>

                                </div>

                            </div>
                            {typeof product.description === 'string' && product.description.length > 100 && (
                                <button onClick={() => toggleDescription(product.id)} style={{ border: "none" }}>
                                    {expandedDescriptionId === product.id ? 'Read Less' : 'Read More'}
                                </button>
                            )}
                            <button onClick={() => handleAdd(product)} className="btn" style={{ marginTop: "50px" }}>
                                Add to cart
                            </button>
                        </div>

                    ))
                )}


            </div>
            {/* Pagination controls */}
            <div style={{ marginLeft: "40%" }} className="pagination">

                <div>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ marginRight: '140px' }}
                    >
                        <p>{'<<<'}</p>

                    </button>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={indexOfLastItem >= filteredProducts.length}
                    >
                        <p>{'>>>'}</p>
                    </button>
                </div>

                <input
                    type="number"
                    placeholder="Items Per Page"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    style={{ marginLeft: '65px', width: "150px" }}
                />
            </div>
            <div style={{ position: 'sticky' }}>
                <Footer />
            </div>
        </>
    );
};

export default Products;
