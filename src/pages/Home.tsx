import React from 'react';
import Products from '../components/Products';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
    return (
        <div>
            {/* <h2 className="heading">Welcome to the Redux toolkit store</h2> */}
           <Navbar/>
            <section>
                <h3>Products</h3>
                <Products />
            </section>
        </div>
    );
};

export default Home;
