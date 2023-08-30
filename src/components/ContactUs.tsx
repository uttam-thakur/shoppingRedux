import React, { useState } from "react";
import { Snackbar, TextField, Button, Typography, Container } from "@mui/material";
import emailjs from "emailjs-com";
import Navbar from "./Navbar";
// import Footer from "./footer";
// import Nav from "./nav";

const Contact: React.FC = () => {
    const [feedback, setFeedback] = useState({
        namee: "",
        emaill: "",
        comment: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs
            .sendForm("service_l37lwpj", "template_25ybnov", e.currentTarget, "Nw7AxfQ-a0XQdVmy0")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    const sendFeedbackHandler = () => {
        if (feedback?.namee?.length < 2) {
            setSnackbarOpen(true);
        } else if (!feedback?.emaill?.includes(".com")) {
            setSnackbarOpen(true);
        } else if (feedback?.comment === "") {
            setSnackbarOpen(true);
        } else {
            setSnackbarOpen(false);
            setFeedback({ namee: "", emaill: "", comment: "" });
        }
    };

    return (
        <div>
            <Navbar />
            <Typography variant="h4" align="center" gutterBottom>
                Feedback
            </Typography>

            <Container
                sx={{
                    display: "flex",
                    height: "50vh",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                }}
            >
                <form onSubmit={sendEmail}>
                    <TextField
                        type="text"
                        name="name"
                        variant="outlined"
                        label="Name"
                        value={feedback.namee}
                        onChange={(e: { target: { value: any; }; }) => setFeedback({ ...feedback, namee: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        type="email"
                        name="user_email"
                        variant="outlined"
                        label="Email"
                        value={feedback.emaill}
                        onChange={(e: { target: { value: any; }; }) => setFeedback({ ...feedback, emaill: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        multiline
                        rows={4}
                        name="message"
                        variant="outlined"
                        label="Feedback"
                        value={feedback.comment}
                        onChange={(e: { target: { value: any; }; }) => setFeedback({ ...feedback, comment: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <br />
                    <Button variant="contained" onClick={sendFeedbackHandler} type="submit">
                        Send
                    </Button>
                </form>
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Please fill in valid details"
            />
            {/* <Footer /> */}
        </div>
    );
};

export default Contact;
