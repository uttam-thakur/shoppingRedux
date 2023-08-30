import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUsername, setPassword, setUserCredential } from "../store/authSlice";
import { login } from "../Services/servicesApi";
import { RootState } from "../store/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, password } = useSelector((state: RootState) => state.auth);
  const isLoginDisabled = !username || !password;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "username") {
      dispatch(setUsername(value));
    } else if (name === "password") {
      dispatch(setPassword(value));
    }
  };

  async function handleSubmit(event: any) {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      setIsLoading(true);
      console.log(userCredential.user);
      setSuccessMessage(true);

      if (userCredential) {
        setSuccessMessage(false);
        navigate("/home");
        dispatch(setUserCredential(userCredential.user));
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Incorrect email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {successMessage && (
        <div>
          <p>Successfully logged in!</p>
        </div>
      )}

      {!!errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}

      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Email"
            value={username}
            onChange={handleInputChange}
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
          <div>
            <button type="submit" disabled={isLoginDisabled || isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
      <div>
        <Link to="/signup">Or sign-up here</Link>
      </div>
    </div>
  );
};

export default Login;

