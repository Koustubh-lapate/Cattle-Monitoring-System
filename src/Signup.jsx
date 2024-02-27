import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useState } from "react";

function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignup = () => {
        // Input validation
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        // Signup request
        fetch("http://localhost:3000/admin/signup", {
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
                throw new Error("Signup failed");
            }
            return resp.json();
        })
        .then((data) => {
            localStorage.setItem("token", data.token);
            window.location = "/menu"; // Redirect after successful signup
        })
        .catch((error) => {
            setError("Signup failed. Please try again."); // Error handling
            console.error("Signup error:", error);
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
                <b>Sign Up Below!</b>
                </Typography>

            </div>

            <div style={{display: "flex", justifyContent: "center"}}>

                <Card variant="outlined" style={{
                    width: 400,
                    padding: 20,
                }}>
                    <TextField 
                    fullWidth={true} 
                    label="Email" 
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null); // Clear previous errors
                    }}
                    variant="outlined" />
                    
                    <br/><br/>
                    
                    <TextField 
                    fullWidth={true} 
                    label="Password" 
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null); // Clear previous errors
                    }}
                    variant="outlined" 
                    type="password" />
                    
                    <br/><br/>

                    {error && <Typography color="error">{error}</Typography>} {/* Error display */}

                    <Button 
                    size="large" 
                    variant="contained"
                    onClick={handleSignup} // Use a separate function for clarity
                    
                    >Sign Up</Button>
                
                </Card>

            </div>
        
        </div>
    )
}

export default Signup;