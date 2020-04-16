import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import { fetchEditSuccess, fetchEditError, saveEditInputInfoSuccess, saveEditInputInfoError } from './action';
import { FETCH_EDIT_START, FETCH_PWDINFO, SAVE_EDITINPUTINFO_START } from '../../../src/common/API';
import { request } from '../../common/util/request';
const pwdInfo = {
    applicationClass: "",
    head: [{
        position: "1",
        name: "oldPassword",
        label: "旧密码",
        must: "0",
        lmt: "",
        readOnly: "0",
        groupName: "",
        type: "string"
    },
    {
        position: "2",
        name: "password",
        label: "新密码",
        must: "0",
        lmt: "",
        readOnly: "0",
        groupName: "",
        type: "string"
    },
    {
        position: "3",
        name: "password2",
        label: "重复新密码",
        must: "0",
        lmt: "",
        readOnly: "0",
        groupName: "",
        type: "string"
    },
    ],
    data: {},
    model: '',
    name: '',
    extraData: [],
    pageButton: [
        {
            name: "保存",
            type: "save_view",
            link: "/api-user/base/find/view/myUserInfo/",
            linkField: "id",
            jsonValue: null,
            component: null,
            linkUrl: "/api-user/base/find/view/myUserInfo/"
        },
        {
            name: "取消",
            type: "save_view",
            link: "/api-user/base/find/view/myUserInfo/",
            linkField: "id",
            jsonValue: null,
            component: null,
            linkUrl: "/api-user/base/find/view/myUserInfo/"
        }
    ],
    serverAfterJS: null,
    serverBeforeJS: null,
    url: '',
    webJS: null,
    isLoaded: true
};

function fetchEdit(data) {
    return request(data)
}

function* getEditAction(action) {
    try {
        const edit = yield call(fetchEdit, action.paload);
        yield put(fetchEditSuccess(edit));
    } catch (err) {
        yield put(fetchEditError(err));
    }
}

function saveEditInputInfo(data) {
    return request(data)
}

function* saveEditInputInfoAction(action) {
    try {
        const editInputInfo = yield call(saveEditInputInfo, action.paload);
        if (editInputInfo === 'FAILED') {
            yield put(saveEditInputInfoError(editInputInfo));
        } else {
            yield put(saveEditInputInfoSuccess(editInputInfo));
        }
    } catch (err) {
        yield put(saveEditInputInfoError(err));
    }
}

export function* pwdInfoAsync() {
    yield delay(500);
    yield put(fetchEditSuccess(pwdInfo));
}

export default function* EditSaga() {
    yield takeEvery(FETCH_EDIT_START, getEditAction);
    yield takeEvery(SAVE_EDITINPUTINFO_START, saveEditInputInfoAction);
    yield takeLatest(FETCH_PWDINFO, pwdInfoAsync);
}