import { call, put, takeEvery } from 'redux-saga/effects';
import { deleteSuccess, deleteError, saveOrUpdateSuccess, saveOrUpdateError } from './action';
import { DELETE_START, SAVEORUPDATE_START } from '../../../src/common/API';
import { request } from '../../common/util/request';
import { message } from 'antd';
function deleteStart(data) {
    return request(data)
}

function* deleteAction(action) {
    try {
        const { deleteId, currentPage } = action.paload;
        const deleteInfo = yield call(deleteStart, action.paload);
        yield put(deleteSuccess({ deleteId, currentPage, message: deleteInfo }));
    } catch (err) {
        yield put(deleteError(err));
    }
}

let saveLoading = '';
let saveTitle = ''
function saveOrUpdateStart(data) {
    saveTitle = data.title;
    saveLoading = message.loading(`正在${saveTitle}...`, 0);
    return request(data)
}

function* saveOrUpdateAction(action) {
    try {
        const saveOrUpdate = yield call(saveOrUpdateStart, action.paload);
        saveLoading();
        message.success(`${saveTitle}成功!`, 2.5)
        yield put(saveOrUpdateSuccess(saveOrUpdate));
    } catch (err) {
        yield put(saveOrUpdateError(err));
    }
}

export default function* SelefButtonSaga() {
    yield takeEvery(DELETE_START, deleteAction);
    yield takeEvery(SAVEORUPDATE_START, saveOrUpdateAction);
}