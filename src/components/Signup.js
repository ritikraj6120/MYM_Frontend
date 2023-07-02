import React from "react";
import "./styles/Login.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, fetchUserInfo } from "../actions/userAction.js";
import { notifyWarning } from "../alert";
import { USER_LOGIN_FAIL } from "../constants/userConstant";
import { notifyError } from "../alert";
const Signup = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const signUp = (e) => {
        e.preventDefault();
        if (name.length < 1) {
            notifyWarning("Name is required");
            return;
        }
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            notifyWarning("Invalid E-mail");
            return;
        }
        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                password
            )
        ) {
            notifyWarning(
                "Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                4000
            );
            return;
        }
        const user = {
            name: name,
            email: email,
            password: password,
        };
        dispatch(signup(user, history));
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
        <div className="login">
            <div className="login__container">
                <h1>Sign Up</h1>
                <form action="" method="post">
                    <h5>Name</h5>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        autoComplete="off"
                    />
                    <h5>E-mail</h5>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        autoComplete="off"
                    />
                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        autoComplete="off"
                    />
                    <button
                        className="login__signInButton "
                        type="submit"
                        onClick={signUp}
                    >
                        Sign UP
                    </button>
                </form>
                <div className="login__signUp login__signIn">
                    <Link to="/login">Sign In</Link>
                </div>
                <p>
                    By signing-up you agree to the MYM Conditions of Use & Sale.
                    Please see our Privacy Notice, our Cookies Notice and our
                    Interest-Based Ads Notice.
                </p>
                {/* <button  onClick={register} className="login__registerButton">Create your amazon account</button> */}
            </div>
            <button
                type="button"
                className="btn btn-success google__signin center"
                onClick={() => signInWithGoogle()}
            >
                <h5>or Sign Up with Google 🚀</h5>
            </button>
        </div>
    );
};

export default Signup;
