import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Appbar from "./Appbar";

function App(){
    return(
        <div style={{width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee"}}>

            <Router>

                <Appbar />

                <Routes>
                    <Route path="/login" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/menu" element={<Menu />} />
                </Routes>

            </Router>

        </div>
    )  
}

export default App;