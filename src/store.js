import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer.js";
import {getCookie} from './cookies/Cookie'

const isloggedIn = (getCookie('token') ? true : false) || (getCookie('google-token') ? true : false);
const email=localStorage.getItem("email")
const userName=localStorage.getItem('userName');	
const initialState = {
	userLogin: { isloggedIn:isloggedIn } ,
	userDetail:{
		profile_photo: "%PUBLIC_URL%/default_profile_photo.png",
		email: email,
		userName: userName
	}
};
const store = createStore(rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk)));
export default store; 