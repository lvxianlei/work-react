import { FETCH_MAIN_START, FETCH_MAIN_SUCCESS, FETCH_MAIN_ERROR } from '../../../src/common/API'

export function fetchMainStart(paload) {
    return {
        type: FETCH_MAIN_START,
        paload
    }
}

export function fetchMainSuccess(paload) {
    return {
        type: FETCH_MAIN_SUCCESS,
        paload
    }
}

export function fetchMainError(paload) {
    return {
        type: FETCH_MAIN_ERROR,
        paload
    }
}

