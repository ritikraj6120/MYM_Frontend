import {
    ITEMS_GET_REQUEST,
    ITEMS_GET_SUCCESS,
    ITEMS_GET_FAIL,
} from "../constants/itemConstant";

const host = "http://ec2-13-233-236-156.ap-south-1.compute.amazonaws.com:5000";
// const host ="http://localhost:5000"

export const fetchUrl = () => async (dispatch) => {
    try {
        dispatch({
            type: ITEMS_GET_REQUEST,
        });
        const response = await fetch(
            "https://api.nasa.gov/planetary/apod?api_key=cLH9owafccepMgbwfFPHx7L24ff2cDktnNtuTZf2"
        );
        if (response.status === 200) {
            const data = await response.json()
            dispatch({
                type: ITEMS_GET_SUCCESS,
                payload: data.url,
            });
        }
        else {
            dispatch({
                type: ITEMS_GET_FAIL,
                payload: "Server Side Error",
            });
        }
    } catch (error) {
        dispatch({
            type: ITEMS_GET_FAIL,
            payload: "Client Side Error",
        });
    }
};
