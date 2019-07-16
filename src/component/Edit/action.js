import { FETCH_EDIT_START, FETCH_EDIT_SUCCESS, FETCH_EDIT_ERROR, FETCH_PWDINFO } from '../../../src/common/API'

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

export function fetchPwdInfo(paload) {
    return {
        type: FETCH_PWDINFO,
        paload
    }
}

