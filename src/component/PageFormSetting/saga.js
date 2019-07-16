import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchPageFormSettingSuccess, fetchPageFormSettingError } from './action';
import { FETCH_PAGEFORMSETTING_START } from '../../../src/common/API';
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

export default function* EditSaga() {
    yield takeEvery(FETCH_PAGEFORMSETTING_START, getPageFormSettingAction);
}