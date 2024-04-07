import { Button, TextField, Typography, Card, CircularProgress } from "@mui/material";
import { useState } from "react";

function UploadImage() {
    const [cowId, setCowId] = useState(0);
    const [image, setImage] = useState(null); // Changed to null to hold file object instead of link
    const [prediction, setPrediction] = useState("");
    const [submitted, setSubmitted] = useState(false); // State variable to track if data has been submitted
    const [loading, setLoading] = useState(false); // State variable to track loading state

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleUpload = () => {
        setLoading(true); // Set loading to true when upload begins

        const formData = new FormData();
        formData.append("cow_id", cowId);
        formData.append("image", image);

        fetch("backend route", {
            method: "POST",
            body: formData,
            headers: {
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

    return (
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
                <div style={{ display: "flex", justifyContent: "center" }}>

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
                            variant="outlined"
                        />
                        <br /><br />

                        {/* Input field for image upload */}
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-image"
                            multiple={false}
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="upload-image">
                            <Button
                                variant="contained"
                                component="span"
                                size="large"
                            >
                                Upload Image
                            </Button>
                        </label>

                        {/* Display selected image */}
                        {image && (
                            <div style={{ marginTop: 20 }}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Uploaded"
                                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                                />
                            </div>
                        )}

                        {/* Submit button */}
                        {image && (
                            <div style={{ marginTop: 20 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpload}
                                >
                                    Submit
                                </Button>
                            </div>
                        )}

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
    );
}

export default UploadImage;