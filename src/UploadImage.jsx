import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

function UploadImage(){
    const [cowId, setCowId] = useState(0);
    const [image, setImage] = useState("");

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
                    variant="oulined" />
                    <br/><br/>

                    <Button
                    size="large"
                    variant="contained"

                    onClick={() => {
                        fetch("http://localhost:3000/cow/imageData", {
                            method: "POST",

                            body: JSON.stringify({
                                cow_id: cowId,
                                imageLink: image
                            }),

                            headers: {
                                "content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }

                        }).then((resp) => {
                            return resp.json().then((data) => {
                                alert("Cow Image Uploaded Successfully!");
                            })
                        })
                    }}

                    >Upload Image</Button>

                </Card>

            </div>

        
        </div>
    )
}

export default UploadImage;