// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from "./store/store";
// import Home from './pages/Home';
// import Cart from './pages/Cart';
// import Navbar from './components/Navbar';
// import Address from './components/Address';
// import Login from './pages/Login';

// function App(): JSX.Element {
//     return (
//         <div className="App">
//             <Provider store={store}>
//                 <BrowserRouter>
//                     {/* <Navbar /> */}
//                     <Routes>
//                         <Route path="/" element={<Login />} />
//                         <Route path="/home" element={<Home />} />
//                         <Route path="/cart" element={<Cart />} />
//                         <Route path="/address" element={<Address />} />
//                     </Routes>
//                 </BrowserRouter>
//             </Provider>
//         </div>
//     );
// }

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store/store";
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Address from './components/Address';
import Login from './pages/Login';
function App(): JSX.Element {
    // const { username } = useSelector((state: RootState) => state?.auth);
    return (
            <Provider store={store}>
        <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/home"
                            element={<Home />} 
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/address" element={<Address />} />
                    </Routes>
                </BrowserRouter>
        </div>
            </Provider>
    );
}

export default App;

