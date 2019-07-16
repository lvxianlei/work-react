import {LOGIN_START,LOGIN_SUCCESS,LOGIN_ERROR} from '../../../src/common/API'

export function loginStart(paload){
    return {
        type:LOGIN_START,
        paload
    }
}

export function loginSuccess(paload){
    return {
        type:LOGIN_SUCCESS,
        paload
    }
}

export function loginError(paload){
    return {
        type:LOGIN_ERROR,
        paload
    }
}