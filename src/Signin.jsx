import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useState } from "react";

function Signin(){
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
                <b>Welcome Back! Sign In below</b>
                </Typography>

            </div>

            <div style={{display: "flex", justifyContent: "center"}}>

                <Card variant="outlined" style={{
                    width: 400,
                    padding: 20,
                }}>
                    <TextField 
                    fullWidth={true} 
                    id="outlined-basic" 
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}

                    label="Email" 
                    variant="outlined" />
                    <br/><br/>
                    
                    <TextField 
                    fullWidth={true} 
                    id="outlined-basic"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    
                    
                    label="Password" 
                    variant="outlined" 
                    type="password" />
                    <br/><br/>

                    <Button 
                    size="large" 
                    variant="contained"
                    
                    onClick={() => {
                        fetch("http://localhost:3000/admin/login", {
                            method: "POST",
                            
                            body: JSON.stringify({
                                "username": email,
                                "password": password,
                            }),
                            
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((resp) => {
                            return resp.json().then((data) => {
                                localStorage.setItem("token", data.token);
                                window.location = "/menu";
                            })
                        })
                    }}

                    >Sign In</Button>
                
                </Card>

            </div>
        
        </div>
    )
}

export default Signin;