import {
    ITEMS_GET_REQUEST,
    ITEMS_GET_SUCCESS,
    ITEMS_GET_FAIL
} from "../constants/itemConstant";

export const fetchUrlReducer = (
    state = { loading: true, url: "", error: null },
    action
) => {
    switch (action.type) {
        case ITEMS_GET_REQUEST:
            return { ...state, loading: true, url: "", error: null };

        case ITEMS_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                url: action.payload,
                error: null,
            };

        case ITEMS_GET_FAIL:
            return {
                ...state,
                loading: false,
                url: "",
                error: action.payload,
            };
        default:
            return state;
    }
};
