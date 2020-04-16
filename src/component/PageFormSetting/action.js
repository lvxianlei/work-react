import {
    FETCH_PAGEFORMSETTING_START,
    FETCH_PAGEFORMSETTING_SUCCESS,
    FETCH_PAGEFORMSETTING_ERROR,
    SAVE_PAGEFORMSETTING_START,
    SAVE_PAGEFORMSETTING_SUCCESS,
    SAVE_PAGEFORMSETTING_ERROR,
} from '../../../src/common/API'

export function fetchPageFormSettingStart(paload) {
    return {
        type: FETCH_PAGEFORMSETTING_START,
        paload
    }
}

export function fetchPageFormSettingSuccess(paload) {
    return {
        type: FETCH_PAGEFORMSETTING_SUCCESS,
        paload
    }
}

export function fetchPageFormSettingError(paload) {
    return {
        type: FETCH_PAGEFORMSETTING_ERROR,
        paload
    }
}

export function savePageFormSettingStart(paload) {
    return {
        type: SAVE_PAGEFORMSETTING_START,
        paload
    }
}

export function savePageFormSettingSuccess(paload) {
    return {
        type: SAVE_PAGEFORMSETTING_SUCCESS,
        paload
    }
}

export function savePageFormSettingError(paload) {
    return {
        type: SAVE_PAGEFORMSETTING_ERROR,
        paload
    }
}

