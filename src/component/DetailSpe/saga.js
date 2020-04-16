import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
    fetchDetailSpeSuccess,
    fetchDetailSpeError,
    fetchgetFlowInstanceLogsActionSuccess,
    fetchgetFlowInstanceLogsActionError,

    submitChangeFlowStatusSuccess,
    submitChangeFlowStatusError
} from './action';
import {
    FETCH_DETAILSPE_START,
    FETCH_DETAILSPE_SUCCESS,
    SUBMIT_CHANGEFLOWSTATUS_START,
    // SUBMIT_CHANGEFLOWSTATUS_SUCCESS
} from '../../common/API';
import { request } from '../../common/util/request';
function fetchDetailSpe(data) {
    return request(data);
}

function* getDetailSpeAction(action) {
    try {
        const detailSpe = yield call(fetchDetailSpe, action.paload);
        yield put(fetchDetailSpeSuccess(detailSpe));
    } catch (err) {
        yield put(fetchDetailSpeError(err));
    }
}

function fetchFlowInstanceLogs(data) {
    return request(data);
}

function* getFlowInstanceLogsAction(action) {
    try {
        const flowInstanceLogs = yield call(fetchFlowInstanceLogs, {
            path: "/workflow/base/plist/flowInstanceLogs",
            data: { current: "1", pageSize: "0", params: { "flowInstance.id": action.paload.data.flowInstanceId } }
        });
        yield put(fetchgetFlowInstanceLogsActionSuccess(flowInstanceLogs));
    } catch (err) {
        yield put(fetchgetFlowInstanceLogsActionError(err));
    }
}

function submitChangeFlowStatus(data) {
    return request(data);
}

function* submitChangeFlowStatusAction(action) {
    try {
        const changeFlowStatus = yield call(submitChangeFlowStatus, action.paload);
        yield put(submitChangeFlowStatusSuccess(changeFlowStatus));
    } catch (err) {
        yield put(submitChangeFlowStatusError(err));
    }
}

export default function* DetailSpeSaga() {
    yield takeLatest(FETCH_DETAILSPE_START, getDetailSpeAction);
    yield takeLatest(FETCH_DETAILSPE_SUCCESS, getFlowInstanceLogsAction);
    yield takeEvery(SUBMIT_CHANGEFLOWSTATUS_START, submitChangeFlowStatusAction);
}