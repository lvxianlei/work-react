import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
    fetchContractReportPageSuccess, fetchContractReportPageError,
    fetchDeptReportSuccess, fetchDeptReportError
} from './action';
import { FETCH_CONTRACTREPORTPAGE_START, FETCH_CONTRACTREPORTPAGE_SUCCESS } from '../../../src/common/API';
import { request } from '../../common/util/request';
function fetchContractReportPage(data) {
    return request(data);
}

function* getContractReportAction(action) {
    try {
        const user = yield call(fetchContractReportPage, action.paload);
        yield put(fetchContractReportPageSuccess(user));
    } catch (err) {
        yield put(fetchContractReportPageError(err));
    }
}

function fetchDeptReport(data) {
    return request(data);
}

function* getDeptReportAction(action) {
    try {
        const deptReportUrls = action.paload.data;
        const deptReport = yield all(...[deptReportUrls.map(item => call(fetchDeptReport, { path: item.url }))]);
        yield put(fetchDeptReportSuccess(deptReport));
    } catch (err) {
        yield put(fetchDeptReportError(err));
    }
}

export default function* ContractReportPageSaga() {
    yield takeLatest(FETCH_CONTRACTREPORTPAGE_START, getContractReportAction);
    yield takeLatest(FETCH_CONTRACTREPORTPAGE_SUCCESS, getDeptReportAction);
}