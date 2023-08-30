// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   CardActions,
//   Grid,
//   IconButton,
//   InputAdornment,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import { CircularProgress } from "@mui/material";
// import { Link,Navigate, useNavigate } from "react-router-dom";
// import {createUserWithEmailAndPassword} from "firebase/auth"
// import { auth,db } from "../firebase"
// import { Snackbar, SnackbarContent } from "@material-ui/core";
// import { Alert } from "@mui/material";
// import {collection, addDoc} from "firebase/firestore"
// const useStyles = makeStyles((theme) => ({
//   passwordAdornment: {
//     cursor: "pointer",
//   },

//   container: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     minHeight: "100vh",
//   },
//   card: {
//     maxWidth: 400,
//     background: "rgba(255, 255, 255, 0.8)",
//     borderRadius: theme.spacing(1),
//     padding: theme.spacing(3),
//     boxShadow: theme.shadows[5],
//     animation: "$fadeIn 1s ease-in-out forwards",
//   },
//   cardActions: {
//     marginTop: theme.spacing(2),
//     justifyContent: "center",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   "@keyframes fadeIn": {
//     "0%": {
//       opacity: 0,
//     },
//     "100%": {
//       opacity: 1,
//     },
//   },
// }));

// const Signup: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(false); // Add loading state
//   const [successMessage, setSuccessMessage] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
// const navigate = useNavigate()
//   const classes = useStyles();
//   const [payload, setPayload] = useState({
//     email: "",
//     username: "",
//     password: "",
//   });

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setPayload((prevPayload) => ({
//       ...prevPayload,
//       [name]: value,
//     }));
//   };


//   const handleSubmit = async (event: any) => {
//   event.preventDefault();
//   setIsLoading(true);

//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       payload.email,
//       payload.password
//     );
//     console.log(userCredential);
//     addDoc(collection(db,"users"),{
//       userEmail:payload.email, password:payload.password, uid:userCredential.user.uid
//     })
//     setSuccessMessage(true);
//     setTimeout(() => {
//       setSuccessMessage(false);
//       navigate("/"); 
//     }, 1500);
//   } catch (error) {
//     console.log("error", error);
//     setErrorMessage("Email Already use. please use another email");
//   } finally {
//     setIsLoading(false);
//       // setSuccessMessage(false);

//     setPayload({
//       email: "",
//       username: "",
//       password: "",
//     });

//   }
// };

//   return (
//     <div className={classes.container}>
//       <Snackbar
//         open={successMessage}
//         autoHideDuration={1500}
//         onClose={() => setSuccessMessage(false)}
//       >
//         <Alert onClose={() => setSuccessMessage(false)} severity="success">
//           User Successfully created!
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={!!errorMessage}
//         autoHideDuration={5000}
//         onClose={() => setErrorMessage("")}
//       >
//         <Alert onClose={() => setErrorMessage("")} severity="error">
//           {errorMessage}
//         </Alert>
//       </Snackbar>
//       <Container component="main" maxWidth="xs">
//         <Card className={classes.card}>
//           <CardContent>
//             <Typography component="h1" variant="h5">
//               Sing-Up
//             </Typography>
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="email"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 value={payload.email}
//                 onChange={handleInputChange}
//               />
//               {/* <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 autoComplete="username"
//                 autoFocus
//                 value={payload.username}
//                 onChange={handleInputChange}
//               /> */}
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={payload.password}
//                 onChange={handleInputChange}
//               />

//               <CardActions className={classes.cardActions}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   startIcon={
//                     isLoading ? (
//                       <CircularProgress size={20} color="inherit" />
//                     ) : null
//                   }
//                   // className={isLoading ? classes.loadingButton : null}
//                 >
//                   {isLoading ? "Creating Account..." : "Submit"}
//                 </Button>
//               </CardActions>
//             </form>
//           </CardContent>
//           <CardContent>
//             <Link to="/">Already sing-up? login here</Link>
//           </CardContent>
//         </Card>
//       </Container>
//       <Grid item xs={6} sm={6} md={6} lg={6}>
//         <img
//           src="https://brandroofsolutions.com/wp-content/uploads/2020/12/cms-and-ecommerce.gif"
//           alt="Background"
//           className={classes.image}
//         />
//       </Grid>
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Simulate user creation
      console.log("Simulated user creation:", payload);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log("error", error);
      setErrorMessage("Email Already in use. Please use another email.");
    } finally {
      setIsLoading(false);
      setPayload({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div>
      {successMessage && <p>User Successfully created!</p>}
      {!!errorMessage && <p>{errorMessage}</p>}
      <div>
        <h1>Sign-Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={payload.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={payload.password}
            onChange={handleInputChange}
          />
          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <div>
        <Link to="/">Already signed up? Login here</Link>
      </div>
    </div>
  );
};

export default Signup;
