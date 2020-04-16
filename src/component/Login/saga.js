import { call, put, takeEvery } from 'redux-saga/effects';
import { loginSuccess, loginError } from './action';
import { LOGIN_START } from '../../../src/common/API';
import { fetch } from 'whatwg-fetch';
import { setItem,removeItem } from '../../common/util/util';
function dataFormat(values) {
    let loginInfo = '';
    for (let key in values) {
        loginInfo += `${key}=${values[key]}&`
    }
    return loginInfo.slice(0, loginInfo.length - 1);
}

function getToken(data) {
    return new Promise((resolve, reject) => {
        fetch('/api-user/oauth/token', {
            method: "POST",
            headers: {
                'Authorization': 'Basic YXBwNTBqaWE6NTBqaWExMjM0NTY=',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }, body: `${dataFormat(data)}`
        }).then(res => {
            if (res.ok) {
                return resolve(res.json())
            } else {
                return reject(res);
            }
        });
    })
}

function* getTokenAction(action) {
    try {
        const user = yield call(getToken, action.paload);
        removeItem("openKeys");
        setItem(user);
        yield put(loginSuccess(user));
    } catch (err) {
        yield put(loginError(err));
    }
}


export default function* LoginSaga() {
    yield takeEvery(LOGIN_START, getTokenAction);
}