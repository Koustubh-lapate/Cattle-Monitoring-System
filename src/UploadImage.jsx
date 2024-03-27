import { Button, TextField, Typography, Card, CircularProgress } from "@mui/material";
import { useState } from "react";

function UploadImage(){
    const [cowId, setCowId] = useState(0);
    const [image, setImage] = useState("");
    const [prediction, setPrediction] = useState("");
    const [submitted, setSubmitted] = useState(false); // State variable to track if data has been submitted
    const [loading, setLoading] = useState(false); // State variable to track loading state

    const handleUpload = () => {
        setLoading(true); // Set loading to true when upload begins

        fetch("http://localhost:3000/cow/imageData", {
            method: "POST",
            body: JSON.stringify({
                cow_id: cowId,
                imageLink: image
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Error uploading image");
        })
        .then((data) => {
            setPrediction(data.prediction);
            setSubmitted(true); // Set submitted to true after receiving the prediction
        })
        .catch((error) => {
            console.error("Error:", error);
            // Handle error (e.g., display error message to user)
        })
        .finally(() => {
            setLoading(false); // Set loading to false when upload completes (whether successful or not)
        });
    };

    return(
        <div>
            <div style={{
                paddingTop: 20,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>

                <Typography variant="h6">
                    <b>Add Image of the Suspected Cow Below!</b>
                </Typography>

            </div>

            {/* Conditionally render loader while loading */}
            {loading && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                    <CircularProgress />
                </div>
            )}

            {/* Conditionally render input fields based on 'submitted' state */}
            {!submitted && !loading && (
                <div style={{display: "flex", justifyContent: "center"}}>

                    <Card variant="outlined" style={{
                        width: 400,
                        padding: 20,
                    }}>

                        <TextField
                        fullWidth={true}
                        id="outlined-basic"
                        onChange={(e) => {
                            setCowId(e.target.value);
                        }}

                        label="Cow ID"
                        variant="outlined" />
                        <br/><br/>

                        <TextField
                        fullWidth={true}
                        id="outlined-basic"
                        onChange={(e) => {
                            setImage(e.target.value);
                        }}

                        label="Image Link"
                        variant="outlined" />
                        <br/><br/>

                        <Button
                        size="large"
                        variant="contained"
                        onClick={handleUpload}
                        >Upload Image</Button>

                    </Card>

                </div>
            )}

            {/* Display result only if data has been submitted */}
            {submitted && (
                <Typography variant="body1" style={{ textAlign: "center", marginTop: 20 }}>
                    Prediction: {prediction}
                </Typography>
            )}

        </div>
    )
}

export default UploadImage;