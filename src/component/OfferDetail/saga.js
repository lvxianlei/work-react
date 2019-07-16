import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchOfferDetailSuccess, fetchOfferDetailError, fetchOfferTabsSuccess, fetchOfferTabsError } from './action';
import { FETCH_OFFERDETAIL_START, FETCH_OFFERDETAIL_SUCCESS, FETCH_OFFERTABS_START } from '../../../src/common/API';
import { request } from '../../common/util/request';

function fetchOfferDetail(data) {
    return request(data);
}

function* getOfferDetailAction(action) {
    try {
        const offerDetail = yield call(fetchOfferDetail, action.paload);
        yield put(fetchOfferDetailSuccess(offerDetail));
    } catch (err) {
        yield put(fetchOfferDetailError(err));
    }
}

function fetchDefaultOfferTabs(data) {
    return request(data);
}

function* getDefaultOfferTabsAction(action) {
    try {
        const { address } = action.paload.nodeList[0];
        const offerDetail = yield call(fetchDefaultOfferTabs, { path: address.URL, data: address.param });
        yield put(fetchOfferTabsSuccess(offerDetail));
    } catch (err) {
        yield put(fetchOfferTabsError(err));
    }
}

function fetchOfferTabs(data) {
    return request(data);
}

function* getOfferTabsAction(action) {
    try {
        const offerDetail = yield call(fetchOfferTabs, action.paload);
        yield put(fetchOfferTabsSuccess(offerDetail));
    } catch (err) {
        yield put(fetchOfferTabsError(err));
    }
}

export default function* SpecialSaga() {
    yield takeLatest(FETCH_OFFERDETAIL_START, getOfferDetailAction);
    yield takeLatest(FETCH_OFFERDETAIL_SUCCESS, getDefaultOfferTabsAction);
    yield takeLatest(FETCH_OFFERTABS_START, getOfferTabsAction);
}