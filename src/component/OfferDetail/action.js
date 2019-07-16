import {
    FETCH_OFFERDETAIL_START, FETCH_OFFERDETAIL_SUCCESS, FETCH_OFFERDETAIL_ERROR,
    FETCH_OFFERTABS_START, FETCH_OFFERTABS_SUCCESS, FETCH_OFFERTABS_ERROR
} from '../../../src/common/API'

export function fetchOfferDetailStart(paload) {
    return {
        type: FETCH_OFFERDETAIL_START,
        paload
    }
}

export function fetchOfferDetailSuccess(paload) {
    return {
        type: FETCH_OFFERDETAIL_SUCCESS,
        paload
    }
}

export function fetchOfferDetailError(paload) {
    return {
        type: FETCH_OFFERDETAIL_ERROR,
        paload
    }
}

export function fetchOfferTabsStart(paload) {
    return {
        type: FETCH_OFFERTABS_START,
        paload
    }
}

export function fetchOfferTabsSuccess(paload) {
    return {
        type: FETCH_OFFERTABS_SUCCESS,
        paload
    }
}

export function fetchOfferTabsError(paload) {
    return {
        type: FETCH_OFFERTABS_ERROR,
        paload
    }
}
