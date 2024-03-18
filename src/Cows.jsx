import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Cows(){
    const [cows, setCows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/cowsData", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp) => {
            return resp.json().then((data) => {
                setCows(data.cows)
            })
        })
    }, [])

    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {cows.map(cow => {
                return <Cow cow = {cow} />
            })}
        </div>
    )
}

function Cow(props){
    return (
        <Card style={{margin: 10, width: 300, minHeight: 300}}>

            <Typography textAlign={"center"} variant="h5">Cow ID = {props.cow.cow_id}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">Temperature of Cow = {props.cow.tempData}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">Milk Production of Cow = {props.cow.milkProductionData}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">Steps of Cow = {props.cow.StepsData}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">Cow Health = {props.cow.health}</Typography>

        </Card>
    )
}

export default Cows;