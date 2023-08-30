
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store/store";
import Home from './pages/Home';
import Cart from './pages/Cart';
import Address from './components/Address';
import Login from './pages/Login';
import Stripe from './components/Stripe';
import Signup from './pages/Signup';
import Contact from './components/ContactUs';
import AboutUs from './components/AboutUs';
import ProductDetail from './components/ProductDetail'
import OrderHistory from './components/OrderHistory';
import PrivateRoute from './PrivateRoute';
function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<AboutUs />} />

                        <Route path="/home" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/address" element={<Address />} />
                        <Route path="/stripe" element={<Stripe />} />
                        <Route path="/product/:productId" element={<ProductDetail />} />
                        <Route path="/order_history" element={<OrderHistory />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;

// App.tsx
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import Home from './pages/Home';
// import Cart from './pages/Cart';
// import Address from './components/Address';
// import Login from './pages/Login';
// import Stripe from './components/Stripe';
// import Signup from './pages/Signup';
// import Contact from './components/ContactUs';
// import AboutUs from './components/AboutUs';
// import ProductDetail from './components/ProductDetail';
// import OrderHistory from './components/OrderHistory';
// import SignIn from './pages/SignIn';
// import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component

// function App() {
//   return (
//       <Provider store={store}>
//       <div className="App">
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/about" element={<AboutUs />} />
// <>            {/* Use PrivateRoute for protected routes */}
//             <PrivateRoute path="/home" element={<Home />} />
//             <PrivateRoute path="/cart" element={<Cart />} />
//             <PrivateRoute path="/address" element={<Address />} />
//             <PrivateRoute path="/stripe" element={<Stripe />} />
//             <PrivateRoute path="/product/:productId" element={<ProductDetail />} />
//             <PrivateRoute path="/order_history" element={<OrderHistory />} />
//     </>
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </Provider>
//   );
// }

// export default App;
