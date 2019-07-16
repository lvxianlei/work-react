import { fetch } from 'whatwg-fetch';
import { notification } from 'antd';
import { push } from "react-router-redux";
import { getItem } from './util';
import store from '../../../src/index';
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

export const errorHandler = error => {
    const response = error || {};
    const errortext = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (status === 401) {
        notification.error({
            message: '未登录或登录已过期，请重新登录。',
            style: {
                marginTop: 50
            }
        });
        store.dispatch(push('/'));
        return;
    }
    notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errortext,
        style: {
            marginTop: 50
        }
    });
    // if (status === 403) {
    //     store.dispatch(push('/nomatch/403'));
    //     return;
    // }
    // if (status <= 504 && status >= 500) {
    //     store.dispatch(push('/nomatch/500'));
    //     return;
    // }
    // if (status >= 404 && status < 422) {
    //     store.dispatch(push('/nomatch/404'));
    // }
}

// const dataFormat = (values) => {
//     let loginInfo = '';
//     for (let key in values) {
//         loginInfo += `${key}=${values[key]}&`
//     }
//     return loginInfo.slice(0, loginInfo.length - 1);
// }

export const request = info => {
    const { path, data } = formatRequestInfo(info);
    return new Promise((resolve, reject) => {
        fetch(path, {
            method: "POST",
            headers: {
                'Authorization': 'Basic YXBwNTBqaWE6NTBqaWExMjM0NTY=',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            }, body: `access_token=${getItem('access_token') || ""}&data=${JSON.stringify(data)}`
        }).then(res => {
            if (res.ok) {
                return resolve(res.json())
            } else {
                errorHandler(res);
                reject(res);
            }
        })
    })
};

export function formatRequestInfo(data) {
    let requestInfo = {
        path: '',
        data: ''
    }
    typeof data === 'string' ? requestInfo.path = data : data.path && (requestInfo.path = data.path);
    data.data && (requestInfo.data = data.data);
    return requestInfo;
}