import {
    FETCH_EDIT_START,
    FETCH_EDIT_SUCCESS,
    FETCH_EDIT_ERROR,
    FETCH_PWDINFO,
    SAVE_EDITINPUTINFO_START,
    SAVE_EDITINPUTINFO_SUCCESS,
    SAVE_EDITINPUTINFO_ERROR
} from '../../../src/common/API'

export function fetchEditStart(paload) {
    return {
        type: FETCH_EDIT_START,
        paload
    }
}

export function fetchEditSuccess(paload) {
    return {
        type: FETCH_EDIT_SUCCESS,
        paload
    }
}

export function fetchEditError(paload) {
    return {
        type: FETCH_EDIT_ERROR,
        paload
    }
}

export function saveEditInputInfoStart(paload) {
    return {
        type: SAVE_EDITINPUTINFO_START,
        paload
    }
}

export function saveEditInputInfoSuccess(paload) {
    return {
        type: SAVE_EDITINPUTINFO_SUCCESS,
        paload
    }
}

export function saveEditInputInfoError(paload) {
    return {
        type: SAVE_EDITINPUTINFO_ERROR,
        paload
    }
}

export function fetchPwdInfo(paload) {
    return {
        type: FETCH_PWDINFO,
        paload
    }
}

