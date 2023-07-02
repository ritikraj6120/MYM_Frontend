import { combineReducers } from "redux";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer
} from "./userReducer";
import {
    fetchUrlReducer
} from "./fetchUrlReducer";


const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    fetchUrlState : fetchUrlReducer,
    userDetail : userDetailReducer
});

export default rootReducer;
