
export const getNewTokenSaga ={type:"GET_NEW_TOKEN"}
export const getNewSilentTokenSaga ={type:"GET_NEW_SILENT_REFRESH"}

export const saveUser = (user) => ({
    type: "SAVE_USER",
    payload: {
        user: user
    }
})

export const setStateSuccess = {
    type: "SET_STATE_SUCCESS",
}
export const setStateError = {
    type: "SET_STATE_ERROR",
}
export const setStateLoading ={
    type: "SET_STATE_LOADING",
}

export const setIsLogin = {
    type: "SET_IS_LOGIN",
}
