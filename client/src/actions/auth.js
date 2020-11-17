import { getRefreshToken } from "../api/authApi"

export const refreshToken = () => {
    
}

export const login =()=>{

}

export const register =()=>{

}

export const inputChange = (target) => (
    {
    type: "INPUT_CHANGE",
    payload:{
        input: target.dataset.input,
        value: target.value
    }
})


export const showError = (payload) => ({
    type: 'SHOW_ERROR',
    payload: {
        errors: payload.errors
    }
})

