import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import {
    fetchListSuccess,
    fetchListError,
    fetchTableViewSuccess,
    fetchTableViewError,
    fetchListPopFormSuccess,
    fetchListPopFormError,
    deleteListSuccess,
    deleteListError,
    savePopFormSuccess,
    savePopFormError
} from './action';

import {
    FETCH_LIST_START,
    FETCH_LISTPOPFORM_START,
    FETCH_TABLEVIEW_START,
    DELETE_LIST_START,
    SAVE_POPFORM_START
} from '../../../src/common/API';

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
    if (action.paload && action.paload !== '') {
        try {
            const user = yield call(fetchTableView, action.paload);
            yield put(fetchTableViewSuccess(user));
        } catch (err) {
            yield put(fetchTableViewError(err));
        }
    } else {
        yield put(fetchTableViewSuccess([]))
    }
}

function fetchListPopForm(data) {
    return request(data);
}

function* getListPopFormAction(action) {
    try {
        const user = yield call(fetchListPopForm, action.paload);
        yield put(fetchListPopFormSuccess(user));
    } catch (err) {
        yield put(fetchListPopFormError(err));
    }
}

function deleteList(data) {
    return request(data);
}

function* deleteListAction(action) {
    try {
        const user = yield call(deleteList, action.paload);
        yield put(deleteListSuccess(user));
    } catch (err) {
        yield put(deleteListError(err));
    }
}

function savePopForm(data) {
    return request(data);
}

function* savePopFormAction(action) {
    try {
        const popForm = yield call(savePopForm, action.paload);
        yield put(savePopFormSuccess({ id: popForm.id, data: action.paload.data }));
    } catch (err) {
        yield put(savePopFormError(err));
    }
}

export default function* ListSaga() {
    yield takeLatest(FETCH_LIST_START, getListAction);
    yield takeLatest(FETCH_LISTPOPFORM_START, getListPopFormAction);
    yield takeLatest(FETCH_TABLEVIEW_START, getTableViewAction);
    yield takeEvery(DELETE_LIST_START, deleteListAction);
    yield takeEvery(SAVE_POPFORM_START, savePopFormAction);
}