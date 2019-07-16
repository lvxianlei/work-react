import {
    DELETE_START, DELETE_SUCCESS, DELETE_ERROR,
    SAVEORUPDATE_START, SAVEORUPDATE_SUCCESS, SAVEORUPDATE_ERROR
} from '../../../src/common/API'

export function deleteStart(paload) {
    return {
        type: DELETE_START,
        paload
    }
}

export function deleteSuccess(paload) {
    return {
        type: DELETE_SUCCESS,
        paload
    }
}

export function deleteError(paload) {
    return {
        type: DELETE_ERROR,
        paload
    }
}

export function saveOrUpdateStart(paload) {
    return {
        type: SAVEORUPDATE_START,
        paload
    }
}

export function saveOrUpdateSuccess(paload) {
    return {
        type: SAVEORUPDATE_SUCCESS,
        paload
    }
}

export function saveOrUpdateError(paload) {
    return {
        type: SAVEORUPDATE_ERROR,
        paload
    }
}

