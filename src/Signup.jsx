import { Button, TextField, Typography, Card } from "@mui/material";
import { useState } from "react";

function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div>
            <div style={{
                paddingTop: 100,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>

                <Typography variant="h6">
                    <b>Welcome to Cattle Monitoring System! Sign Up below</b>
                </Typography>

            </div>

            <div style={{display: "flex", justifyContent: "center"}}>

                <Card variant="outlined" style={{
                    width: 400,
                    padding: 20,
                }}>

                    <TextField
                    fullWidth={true}
                    label="Enter Your Name"

                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}

                    variant="outlined" />

                    <br/><br/>

                    <TextField
                    fullWidth={true}
                    label="Enter Your Email"

                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}

                    variant="outlined" />

                    <br/><br/>

                    <TextField
                    fullWidth={true}
                    label="Enter Password"

                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}

                    variant="outlined"
                    type="password" />

                    <br/><br/>

                    <Button
                    size="large"
                    variant="contained"

                    onClick={() => {
                        fetch("http://localhost:3000/user/signup", {
                            method: "POST",

                            body: JSON.stringify({
                                username: username,
                                useremail: email,
                                password: password
                            }),

                            headers: {
                                "Content-type": "application/json"
                            }

                        }).then((resp) => {
                            resp.json().then((data) => {
                                localStorage.setItem("token", data.token);
                                window.location = "/menu";
                            })
                        })
                    }}

                    >Sign Up</Button>

                </Card>

            </div>

        </div>
    )
}

export default Signup;