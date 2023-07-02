import React from "react";
import "./styles/Login.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, fetchUserInfo } from "../actions/userAction.js";
import { USER_LOGIN_FAIL } from "../constants/userConstant";
import { notifyError } from "../alert";

const Login = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        };
        dispatch(login(user, history));
    };

    const signInWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => {
            dispatch(fetchUserInfo(1, codeResponse, history));
        },
        onError: (error) => {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: "Logging Failed. Please try again",
            });
            notifyError("Wrong Credentials Please try again");
        },
    });

    return (
        <>
            <div className="login">
                <div className="login__container">
                    <h1>Sign IN</h1>
                    <form action="" method="post">
                        <h5>E-mail</h5>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            autoComplete="true"
                        />
                        <h5>Password</h5>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            autoComplete="true"
                        />
                        <button
                            className="login__signInButton "
                            type="submit"
                            onClick={signIn}
                        >
                            Sign IN
                        </button>
                    </form>
                    <div className="login__signUp">
                        <Link to="#">Forget Password?</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    <p></p>
                    {/* <button  onClick={register} className="login__registerButton">Create your amazon account</button> */}
                </div>
                <button
                    type="button"
                    className="btn btn-success google__signin center"
                    onClick={() => signInWithGoogle()}
                >
                    <h5>or Sign in with Google 🚀</h5>
                </button>
            </div>
        </>
    );
};

export default Login;
