import {
    FETCH_CONTRACTREPORTPAGE_START, FETCH_CONTRACTREPORTPAGE_SUCCESS, FETCH_CONTRACTREPORTPAGE_ERROR,
    FETCH_DEPREPORT_START, FETCH_DEPREPORT_SUCCESS, FETCH_DEPREPORT_ERROR
} from '../../../src/common/API'

export function fetchContractReportPageStart(paload) {
    return {
        type: FETCH_CONTRACTREPORTPAGE_START,
        paload
    }
}

export function fetchContractReportPageSuccess(paload) {
    return {
        type: FETCH_CONTRACTREPORTPAGE_SUCCESS,
        paload
    }
}

export function fetchContractReportPageError(paload) {
    return {
        type: FETCH_CONTRACTREPORTPAGE_ERROR,
        paload
    }
}

export function fetchDeptReportStart(paload) {
    return {
        type: FETCH_DEPREPORT_START,
        paload
    }
}

export function fetchDeptReportSuccess(paload) {
    
    return {
        type: FETCH_DEPREPORT_SUCCESS,
        paload
    }
}

export function fetchDeptReportError(paload) {
    return {
        type: FETCH_DEPREPORT_ERROR,
        paload
    }
}
