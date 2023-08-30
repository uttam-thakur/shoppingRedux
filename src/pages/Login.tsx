// background: `url('https://mosodigital.com/wp-content/uploads/2021/07/E-Commerce-Shopping-animated-graphic-green.gif')`,
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUsername, setPassword, setUserCredential } from "../store/authSlice";
import { login } from "../Services/servicesApi";
import { RootState } from "../store/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { Snackbar, SnackbarContent } from "@material-ui/core";
import { Alert } from "@mui/material";

import {
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  passwordAdornment: {
    cursor: "pointer",
  },

  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  card: {
    maxWidth: 400,
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(3),
    boxShadow: theme.shadows[5],
    animation: "$fadeIn 1s ease-in-out forwards",
  },
  cardActions: {
    marginTop: theme.spacing(2),
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
}));

const Login = () => {
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();
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
      setIsLoading(true); // Set loading state to true
      console.log(userCredential.user);
      setSuccessMessage(true);

      if (userCredential) {
        setSuccessMessage(false);
        navigate("/home");
        dispatch(setUserCredential(userCredential.user))
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Incorrect email or password"); // You can modify this message

    } finally {

      setIsLoading(false);
    }
  }


  return (
    <div className={classes.container}>
      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() => setSuccessMessage(false)}
      >
        <Alert onClose={() => setSuccessMessage(false)} severity="success">
          Successfully logged in!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <Card className={classes.card}>
          <CardContent>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <CardActions className={classes.cardActions}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoginDisabled || isLoading}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                // className={isLoading ? classes.loadingButton : null}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </CardActions>
            </form>
          </CardContent>
          <CardContent>
            <Link to="/signup">Or sign-up here</Link>
          </CardContent>
        </Card>
      </Container>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <img
          src="https://mosodigital.com/wp-content/uploads/2021/07/E-Commerce-Shopping-animated-graphic-green.gif"
          alt="Background"
          className={classes.image}
        />
      </Grid>

    </div>
  );
};

export default Login;
