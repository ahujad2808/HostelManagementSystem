import { GET_Attendence_DETAILS, ENABLE_Attendence_LOADING, DISABLE_Attendence_LOADING } from "../actions/types";

const initialState = {
    AttendenceData: [],
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_Attendence_DETAILS:
            return {
                ...state,
                AttendenceData: action.payload,
            };
        case ENABLE_Attendence_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DISABLE_Attendence_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}