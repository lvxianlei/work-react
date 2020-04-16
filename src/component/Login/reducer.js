import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../../../src/common/API';
import { Map } from 'immutable';
const initState = Map({
    access_token: "",
    account: "",
    expires_in: '',
    refresh_token: "",
    scope: "",
    token_type: "",
    username: "",
    error: false,
    isLogin: false
});

export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return state.set('error', false).set('isLogin', false);
        case LOGIN_SUCCESS:
            return state.mergeDeep(action.paload).set('isLogin', true);
        case LOGIN_ERROR:
            return state.set('error', true).set('errorInfo', action.paload);
        default:
            return state;
    }
};