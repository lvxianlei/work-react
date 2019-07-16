import {
    FETCH_DETAIL_START, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_ERROR,
    FETCH_POPFORM_START, FETCH_POPFORM_SUCCESS, FETCH_POPFORM_ERROR,
    FETCH_RELATION_START, FETCH_RELATION_SUCCESS, FETCH_RELATION_ERROR
} from '../../../src/common/API'

export function fetchDetailStart(paload) {
    return {
        type: FETCH_DETAIL_START,
        paload
    }
}

export function fetchDetailSuccess(paload) {
    return {
        type: FETCH_DETAIL_SUCCESS,
        paload
    }
}

export function fetchDetailError(paload) {
    return {
        type: FETCH_DETAIL_ERROR,
        paload
    }
}

export function fetchRelationStart(paload) {
    return {
        type: FETCH_RELATION_START,
        paload
    }
}

export function fetchRelationSuccess(paload) {
    return {
        type: FETCH_RELATION_SUCCESS,
        paload: paload.map(item => { return { ...item, isLoaded: true } })
    }
}

export function fetchRelationError(paload) {
    return {
        type: FETCH_RELATION_ERROR,
        paload
    }
}

export function fetchPopFormStart(paload) {
    return {
        type: FETCH_POPFORM_START,
        paload
    }
}

export function fetchPopFormSuccess(paload) {
    return {
        type: FETCH_POPFORM_SUCCESS,
        paload
    }
}

export function fetchPopFormError(paload) {
    return {
        type: FETCH_POPFORM_ERROR,
        paload
    }
}