import {
    FETCH_DETAILSPE_START, FETCH_DETAILSPE_SUCCESS, FETCH_DETAILSPE_ERROR,
    FETCH_FLOWINSTANCELOGS_START, FETCH_FLOWINSTANCELOGS_SUCCESS, FETCH_FLOWINSTANCELOGS_ERROR
} from '../../../src/common/API'

export function fetchDetailSpeStart(paload) {
    return {
        type: FETCH_DETAILSPE_START,
        paload
    }
}

export function fetchDetailSpeSuccess(paload) {
    return {
        type: FETCH_DETAILSPE_SUCCESS,
        paload
    }
}

export function fetchDetailSpeError(paload) {
    return {
        type: FETCH_DETAILSPE_ERROR,
        paload
    }
}

export function fetchgetFlowInstanceLogsActionStart(paload) {
    return {
        type: FETCH_FLOWINSTANCELOGS_START,
        paload
    }
}

export function fetchgetFlowInstanceLogsActionSuccess(paload) {
    return {
        type: FETCH_FLOWINSTANCELOGS_SUCCESS,
        paload
    }
}

export function fetchgetFlowInstanceLogsActionError(paload) {
    return {
        type: FETCH_FLOWINSTANCELOGS_ERROR,
        paload
    }
}