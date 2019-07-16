import { call, put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import {
    fetchDetailSuccess, fetchDetailError,
    fetchPopFormSuccess, fetchPopFormError,
    fetchRelationSuccess, fetchRelationError
} from './action';
import { FETCH_DETAIL_START, FETCH_DETAIL_SUCCESS, FETCH_POPFORM_START } from '../../../src/common/API';
import { request } from '../../common/util/request';
function fetchDetail(data) {
    return request(data);
}

function* getDetailAction(action) {
    try {
        const detail = yield call(fetchDetail, action.paload);
        yield put(fetchDetailSuccess(detail));
    } catch (err) {
        yield put(fetchDetailError(err));
    }
}

function fetchRelation(data) {
    return request(data);
}

function* getRelationAction(action) {
    try {
        const relationUrls = action.paload.pageRelations.filter(item => !!item.plistUrl);
        const id = action.paload.data.id;
        const relations = yield all(...[relationUrls.map(item => {
            const key = item.fieldSource;
            const params = { current: "1", pageSize: "100", params: {} };
            params.params[key] = id;
            return call(fetchRelation, { path: item.plistUrl, data: params });
        })]);
        yield put(fetchRelationSuccess(relations));
    } catch (err) {
        yield put(fetchRelationError(err));
    }
}

function fetchPopFormStart(data) {
    return request(data)
}

function* fetchPopFormAction(action) {
    try {
        const popFormInfo = yield call(fetchPopFormStart, action.paload);
        yield put(fetchPopFormSuccess(popFormInfo));
    } catch (err) {
        yield put(fetchPopFormError(err));
    }
}

export default function* SpecialSaga() {
    yield takeLatest(FETCH_DETAIL_START, getDetailAction);
    yield takeLatest(FETCH_DETAIL_SUCCESS, getRelationAction);
    yield takeEvery(FETCH_POPFORM_START, fetchPopFormAction);
}