import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
const App = () => {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <Router>
            <ToastContainer />
            <AllRoutes />
        </Router>
    );
};

export default App;
