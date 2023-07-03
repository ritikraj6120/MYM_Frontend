import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
} from "../constants/userConstant";
import { removeCookie, setCookie } from "../cookies/Cookie";
import {
    notifyError,
    notifySuccess,
    notifyUnAuthorized,
    notifyWarning,
} from "../alert";

const host = "http://ec2-13-233-236-156.ap-south-1.compute.amazonaws.com:5000";

export const login = (user, history) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const response = await fetch(`${host}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const json = await response.json();
        if (response.status === 200) {
            // Save the auth token and redirect
            // localStorage.setItem('token', json.authtoken);
            setCookie("token", json.token);
            dispatch({
                type: USER_LOGIN_SUCCESS,
            });
            notifySuccess("Successfully logged in");
            history.push("/");
            dispatch(fetchUserInfo(0, json, history));
        } else if (response.status === 400) {
            let x = json.error;
            notifyError(x);
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: x,
            });
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: "Logging Failed. Please try again",
            });
            notifyError("Logging Failed. Please try again");
        }
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: "Logging Failed. Please try again",
        });
        notifyError("Logging Failed. Please try again");
    }
};

export const fetchUserInfo = (type, json, history) => async (dispatch) => {
    let default_pic = "%PUBLIC_URL%/default_profile_photo.png";
    try {
        if (type === 0) {
            localStorage.setItem("email", json.email);
            localStorage.setItem("userName", json.userName);
            localStorage.setItem("profile_photo", default_pic);
            dispatch({
                type: USER_DETAIL_SUCCESS,
                payload: {
                    photo: default_pic,
                    email: json.email,
                    userName: json.userName,
                },
            });
        } else {
            setCookie("google-token", json.access_token);
            dispatch({
                type: USER_LOGIN_SUCCESS,
            });
            try {
                dispatch({ type: USER_DETAIL_REQUEST });
                const response = await fetch(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${json.access_token}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${json.access_token}`,
                            Accept: "application/json",
                        },
                    }
                );
                if (response.status == 200) {
                    const data = await response.json();
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("userName", data.name);
                    localStorage.setItem("profile_photo", data.picture);
                    dispatch({
                        type: USER_DETAIL_SUCCESS,
                        payload: {
                            photo: data.picture,
                            email: data.email,
                            userName: data.name,
                        },
                    });
                } else {
                    dispatch({
                        type: USER_DETAIL_FAIL,
                        payload: {
                            photo: default_pic,
                            email: null,
                            userName: null,
                        },
                    });
                }
            } catch (err) {
                dispatch({
                    type: USER_DETAIL_FAIL,
                    payload: {
                        photo: default_pic,
                        email: null,
                        userName: null,
                    },
                });
            }
        }
    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: {
                photo: default_pic,
                email: null,
                userName: null,
            },
        });
    }
};

export const handleLogout = (history) => (dispatch) => {
    removeCookie("token");
    removeCookie("google-token");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");
    dispatch({ type: USER_LOGOUT });
    history.push("/login");
};

export const signup = (user, history) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        const response = await fetch(`${host}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const json = await response.json();

        if (response.status === 200) {
            dispatch({
                type: USER_REGISTER_SUCCESS,
            });
            notifySuccess("Account Created Successfully");
            history.push("/login");
        } else if (response.status === 400) {
            let x = json.error[0];
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: x.msg,
            });
            notifyError(x.msg);
        } else if (response.status === 409) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: "Sorry a user with this e-mail address already exists",
            });
            notifyError("Sorry a user with this e-mail address already exists");
        } else {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: "User Signup fail.please try again",
            });
            notifyError("User Signup fail.please try again");
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: "User Signup fail.please try again",
        });
        notifyError("User Signup fail.please try again");
    }
};
