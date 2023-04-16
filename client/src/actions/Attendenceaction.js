import axios from "axios";

import {
    GET_Attendence_DETAILS,
    ENABLE_Attendence_LOADING,
    GET_ERRORS,
    DISABLE_Attendence_LOADING,
} from "./types";

export const getAttendenceDetails = () => dispatch => {
    dispatch(enableAttendenceLoading());
    axios
        .get(`/api/attendence/`)
        .then((res) => {

            dispatch({
                type: GET_Attendence_DETAILS,
                payload: res.data
            });
            dispatch(disableAttendenceLoading());
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const createAttendenceDetails = AttendenceData => dispatch => {
    axios
        .post("/api/attendence/", AttendenceData)
        .then((res) => {
            dispatch({
                type: GET_Attendence_DETAILS,
                payload: res.data
            });
            dispatch(getAttendenceDetails());
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const enableAttendenceLoading = () => {
    return {
        type: ENABLE_Attendence_LOADING
    };
};
export const disableAttendenceLoading = () => {
    return {
        type: DISABLE_Attendence_LOADING
    };
};