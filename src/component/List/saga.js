import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchListSuccess, fetchListError,
    fetchTableViewSuccess, fetchTableViewError,
    fetchListPopFormSuccess, fetchListPopFormError
} from './action';
import { FETCH_LIST_START, FETCH_LIST_SUCCESS, FETCH_LISTPOPFORM_START } from '../../../src/common/API';
import { request } from '../../common/util/request';
function fetchList(data) {
    return request(data);
}

function* getListAction(action) {
    try {
        const user = yield call(fetchList, action.paload);
        yield put(fetchListSuccess(user));
    } catch (err) {
        yield put(fetchListError(err));
    }
}

function fetchTableView(data) {
    return request(data);
}

function* getTableViewAction(action) {
    try {
        const user = yield call(fetchTableView, action.paload.queryUrl);
        yield put(fetchTableViewSuccess(user));
    } catch (err) {
        yield put(fetchTableViewError(err));
    }
}

function fetchListPopForm(data) {
    return request(data);
}

function* getListPopFormAction(action) {
    try {
        const user = yield call(fetchListPopForm, action.paload.linkUrl);
        yield put(fetchListPopFormSuccess(user));
    } catch (err) {
        yield put(fetchListPopFormError(err));
    }
}


export default function* ListSaga() {
    yield takeLatest(FETCH_LIST_START, getListAction);
    yield takeLatest(FETCH_LISTPOPFORM_START, getListPopFormAction);
    yield takeLatest(FETCH_LIST_SUCCESS, getTableViewAction);
}