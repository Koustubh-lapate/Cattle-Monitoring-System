import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useState } from "react";

function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = () => {
        // Reset error state
        setError("");

        // Perform sign-in request
        fetch("http://localhost:3000/admin/login", {
            method: "POST",
            body: JSON.stringify({
                username: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Sign-in failed");
            }
            return resp.json();
        })
        .then((data) => {
            localStorage.setItem("token", data.token);
            window.location = "/menu"; // Redirect after successful sign-in
        })
        .catch((error) => {
            setError("Sign-in failed. Please check your credentials."); // Error handling
            console.error("Sign-in error:", error);
        });
    };

    return(
        <div>
            <div style={{
                paddingTop: 60,
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
                        id="email"
                        label="Email" 
                        variant="outlined" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br/><br/>
                    
                    <TextField 
                        fullWidth={true} 
                        id="password"
                        label="Password" 
                        variant="outlined" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/><br/>

                    {error && <Typography color="error">{error}</Typography>} {/* Error display */}

                    <Button 
                        size="large" 
                        variant="contained"
                        onClick={handleSignIn} // Use a separate function for clarity
                    >
                        Sign In
                    </Button>
                
                </Card>

            </div>
        
        </div>
    )
}

export default Signin;