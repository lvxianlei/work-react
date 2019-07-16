import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { fetchEditSuccess, fetchEditError } from './action';
import { FETCH_EDIT_START, FETCH_PWDINFO } from '../../../src/common/API';
import { request } from '../../common/util/request';
import { Map } from 'immutable';
const pwdInfo = Map({
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
});

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

export function* pwdInfoAsync() {
    yield delay(500);
    yield put(fetchEditSuccess(pwdInfo));
}

export default function* EditSaga() {
    yield takeEvery(FETCH_EDIT_START, getEditAction);
    yield takeEvery(FETCH_PWDINFO, pwdInfoAsync);
}