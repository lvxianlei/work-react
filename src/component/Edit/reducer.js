import { FETCH_EDIT_START, FETCH_EDIT_SUCCESS, FETCH_EDIT_ERROR } from '../../../src/common/API';
import { Map } from 'immutable';
const initState = Map({
    applicationClass: "",
    head: [],
    data: {},
    model: '',
    name: '',
    extraData: [],
    pageButton: [],
    serverAfterJS: null,
    serverBeforeJS: null,
    url: '',
    webJS: null,
    isLoaded: false
});

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_EDIT_START:
            return initState;
        case FETCH_EDIT_SUCCESS:
            return state.mergeDeep(action.paload).set('isLoaded', true);
        case FETCH_EDIT_ERROR:
            const newState = initState;
            return newState.set('error', action.paload);

        default:
            return initState;
    }
};