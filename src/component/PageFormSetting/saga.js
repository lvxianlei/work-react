import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchPageFormSettingSuccess, fetchPageFormSettingError, savePageFormSettingSuccess, savePageFormSettingError } from './action';
import { FETCH_PAGEFORMSETTING_START, SAVE_PAGEFORMSETTING_START } from '../../../src/common/API';
import { request } from '../../common/util/request';

function fetchPageFormSetting(data) {
    return request(data)
}

function* getPageFormSettingAction(action) {
    try {
        const pageFormSetting = yield call(fetchPageFormSetting, action.paload);
        yield put(fetchPageFormSettingSuccess(pageFormSetting));
    } catch (err) {
        yield put(fetchPageFormSettingError(err));
    }
}

function savePageFormSetting(data) {
    return request(data)
}

function* savePageFormSettingAction(action) {
    try {
        const pageForm = yield call(savePageFormSetting, action.paload);
        yield put(savePageFormSettingSuccess(pageForm));
    } catch (err) {
        yield put(savePageFormSettingError(err));
    }
}

export default function* EditSaga() {
    yield takeEvery(FETCH_PAGEFORMSETTING_START, getPageFormSettingAction);
    yield takeEvery(SAVE_PAGEFORMSETTING_START, savePageFormSettingAction);
}