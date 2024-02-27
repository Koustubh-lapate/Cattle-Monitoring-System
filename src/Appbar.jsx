import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar(){
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/admin/me", {
            method: "GET", 
            
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }

        }).then((resp) => {
            return resp.json().then((data) => {
                if(data.username){
                    setUserEmail(data.username);
                }
                //console.log(data);
            })
        })
    }, [])

    if(userEmail){
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4
        }}>

            <div style={{marginLeft: 10}}>
                <Typography variant="h6"><b>Course Khazana</b></Typography>
            </div>
            
            <div style={{display: "flex"}}>
                
                <div style={{marginRight: 10}}>
                    <Typography variant="h6"><b>Hi Admin!</b></Typography>
                </div>
    
                <div>
                    <Button 
                    variant="contained"
                    onClick={() => {
                        window.location = "/signup";
                        localStorage.setItem("token", null);
                    }}
    
                    >Logout</Button>
                </div>
                
            </div>
    
        </div>
    }

    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4
    }}>
        <div style={{marginLeft: 10}}>
            <Typography variant="h6"><b>Course Khazana</b></Typography>
        </div>
        
        <div style={{display: "flex"}}>
            
            <div style={{marginRight: 10}}>
                <Button 
                variant="contained"
                onClick={() => {
                    navigate("/signup");
                }}
                
                >Sign Up</Button>
            </div>

            <div>
                <Button 
                variant="contained"
                onClick={() => {
                    navigate("/login");
                }}

                >Sign In</Button>
            </div>
            
        </div>

    </div>
}

export default Appbar;