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

export const userLoginReducer = (
    state = {
        loading: false,
        isloggedIn: false,
        error: null,
    },
    action
) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
					loading:false,
                    isloggedIn: true,
					error:null
                }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isloggedIn: false,
                error: action.payload,
            };
        case USER_LOGOUT:
            return {
                ...state,
                loading: false,
                isloggedIn: false,
                error: null,
            };
        default:
            return state;
    }
};

export const userDetailReducer = (
    state = {
        profile_photo: "%PUBLIC_URL%/default_profile_photo.png",
        email: null,
        userName: null,
    },
    action
) => {
	let default_pic = "%PUBLIC_URL%/default_profile_photo.png"; 
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return {
                ...state,
                profile_photo: default_pic,
                email: null,
                userName: null,
            };
        case USER_DETAIL_SUCCESS:
            return { 
                ...state,
                    profile_photo: action.payload.photo,
                    email: action.payload.email,
                    userName: action.payload.userName,
            };
        case USER_DETAIL_FAIL:
            return {
                ...state,
                profile_photo: default_pic,
                email: null,
                userName: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true, success: false, error: null };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, success: true, error: null };
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
