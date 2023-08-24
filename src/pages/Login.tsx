// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { login } from '../Services/servicesApi';
// const Login = () => {
//     const navigate = useNavigate();

//     const [state, setState] = useState({
//         username: "",
//         password: ""
//     });
//     const handleInputChange = (event: any) => {
//         const { name, value } = event.target;
//         setState((prevProps) => ({
//             ...prevProps,
//             [name]: value
//         }));
//     };

//     async function handleSubmit(event: any) {
//         event.preventDefault();
//         console.log("state", state);

//         try {
//             const response = await login({
//                 username: state.username,
//                 password: state.password,

//             })
//             if (localStorage.getItem('user info')) {
//                 // Redirect to Dashboard if access token is present
//                 navigate('/home');
//             }
//         } catch (error: any) {
//             console.log("error", error);

//         }
//     };

//     return (
//         <div>
//             <h1> Login!</h1>

//             <form onSubmit={handleSubmit}>
//                 <div className="form-control">
//                     <label>Email</label>
//                     <input
//                         type="text"
//                         name="username"
//                         value={state.username}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={state.password}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label></label>
//                     <button type="submit">Login</button>
//                 </div>
//             </form>


//         </div>
//     )
// }

// export default Login


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUsername, setPassword } from '../store/authSlice'; // Import your actions and slice
import { login } from '../Services/servicesApi';
import { RootState } from '../store/store';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //   const { username, password } = useSelector(state => state.auth); // Access values from Redux
    const { username, password } = useSelector((state: RootState) => state.auth);
    const isLoginDisabled = !username || !password;

    // console.log("stateRedux", username);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'username') {
            dispatch(setUsername(value)); // Dispatch action to update username in Redux
        } else if (name === 'password') {
            dispatch(setPassword(value)); // Dispatch action to update password in Redux
        }
    };

    async function handleSubmit(event: any) {
        event.preventDefault();
        console.log('state', username, password);

        try {
            const response = await login({
                username: username,
                password: password,
            });
            console.log("res",response);
            
            if (localStorage.getItem('user info')) {
                navigate('/home');
            }
        } catch (error: any) {
            console.log('error', error);
        }
    }
    return (
        <div>
            <h1> Login!</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>User</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-control">
                    <label></label>
                    <button type="submit" disabled={isLoginDisabled}>
                        Login
                    </button>
                </div>
            </form>


        </div>
    );
}

export default Login;
