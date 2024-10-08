import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

function Menu(){
    return <div>
    <div
      style={{
        paddingTop: 60,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4">
        <b>Menu</b>
      </Typography>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        variant="outlined"
        style={{
          width: 400,
          padding: 20,
          minHeight: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
        }}
      >
        <Button
          style={{ marginBottom: 10 }} 
          size="large"
          variant="contained"
          onClick={() => {
            window.location = "/uploadImage";
          }}
        >
          Upload Cow Image
        </Button>

        <Button
          style={{ marginBottom: 10 }}
          size="large"
          variant="contained"
          onClick={() => {
            window.location = "/cows";
          }}
        >
          View Cows RealTime Data
        </Button>

        <Button
          size="large"
          variant="contained"
          onClick={() => {
            window.location = "/cowsAnalysis";
          }}
        >
          View Cows Data Analysis
        </Button>

      </Card>
    </div>
  </div>
}

export default Menu;