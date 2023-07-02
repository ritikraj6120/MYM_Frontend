import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Error from "./components/Error";
const AllRoutes = () => {
    const userLoginState = useSelector((state) => state.userLogin);
    const isloggedIn = userLoginState.isloggedIn;
    return (
        <Switch>
            <Route exact path="/login">
                {isloggedIn ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/signup">
                {isloggedIn ? <Redirect to="/" /> : <Signup />}
            </Route>
            <Route exact path="/">
                {isloggedIn ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route>
                <Error />
            </Route>
        </Switch>
    );
};

export default AllRoutes;
