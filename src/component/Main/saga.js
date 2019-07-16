import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchMainSuccess, fetchMainError } from './action';
import { FETCH_MAIN_START } from '../../../src/common/API';
import { request } from '../../common/util/request';
function fetchMain(data) {
    return request('/common/menu/mainMenu', data)
}

function* getMainAction(action) {
    try {
        const user = yield call(fetchMain, action.paload);
        yield put(fetchMainSuccess(user));
    } catch (err) {
        yield put(fetchMainError(err));
    }
}


export default function* MainSaga() {
    yield takeEvery(FETCH_MAIN_START, getMainAction);
}