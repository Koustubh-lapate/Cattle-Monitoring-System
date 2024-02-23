import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(localStorage.getItem("token") ? "user@example.com" : "");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetch("http://localhost:3000/user/me", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((resp) => {
                return resp.json().then((data) => {
                    if (data.useremail) {
                        setUserEmail(data.useremail);
                    }
                })
            })
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserEmail("");
        navigate("/login");
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4
        }}>

            <div style={{ marginLeft: 10 }}>
                <Typography variant="h6"><b>Cattle Monitoring System</b></Typography>
            </div>

            <div style={{ display: "flex" }}>

                {userEmail ? (
                    <div style={{ marginRight: 10 }}>
                        <Typography variant="h6"><b>Hi User!</b></Typography>
                    </div>
                ) : null}

                {userEmail ? (
                    <div>
                        <Button
                            variant="contained"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <>
                        <div style={{ marginRight: 10 }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                Sign Up
                            </Button>
                        </div>

                        <div>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Sign In
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Appbar;