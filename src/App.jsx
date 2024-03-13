import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Appbar from "./Appbar";
import Menu from "./Menu";

function App(){
    return(
        <div style={{width: "100vw",
        height: "100vh",
        backgroundImage: `url(${"https://static.vecteezy.com/system/resources/previews/023/262/031/non_2x/cute-spotted-cows-in-the-pasture-summer-landscape-a-herd-of-cows-is-grazing-in-the-meadow-poster-banner-illustration-vector.jpg"})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center"}}>

            <Router>

                <Appbar />

                <Routes>
                    <Route path="/login" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/uploadImage" element={<UploadImage />} />
                    <Route path="/cows" element={<Cows />} />
                </Routes>

            </Router>

        </div>
    )  
}

export default App;