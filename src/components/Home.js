import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUrl } from "../actions/fetchUrlAction";
import { handleLogout } from "../actions/userAction";
import { Link, useHistory } from "react-router-dom";
import "./styles/Home.css";
import { USER_LOGOUT } from "../constants/userConstant";
const Home = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const UrlState = useSelector((state) => state.fetchUrlState);
    const userDetailState = useSelector((state) => state.userDetail);
    const email = userDetailState.email;
    useEffect(() => {
        dispatch(fetchUrl());
    }, []);

    // const handleAccount = () => {
    //     history.push("/account");
    // };

    return (
        <>
            { UrlState.loading  ? (
                <div>wait loading</div>
            ) : (
                <>
                    <nav className="navbar  navbar-dark bg-dark custom__navbar">
                        <ul className="nav navbar__items">
                            <li className="nav-item navbar__item">
                                    {!userDetailState.loading && (
                                        <h6>Welcome {email}</h6>
                                    )}
                            </li>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={() =>
                                        dispatch(handleLogout(history))
                                    }
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </nav>
                    {
                        <img
                            className="fitted__image"
                            // src="https://apod.nasa.gov/apod/image/2307/MWAurora_hang_960.jpg"
                            src={UrlState.url}
                            alt="NASA"
                        />
                    }
                </>
            )}
        </>
    );
};

export default Home;
