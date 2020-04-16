import {
    FETCH_EDIT_START, FETCH_EDIT_SUCCESS, FETCH_EDIT_ERROR,
    SAVE_EDITINPUTINFO_START,
    SAVE_EDITINPUTINFO_SUCCESS,
    SAVE_EDITINPUTINFO_ERROR
} from '../../../src/common/API';
import { Map } from 'immutable';
const initState = Map({
    editData: {
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
        isLoaded: false,
        error: false
    },
    saveEditInfo: {
        code: '',
        message: '',
        isLoaded: false
    }
});

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_EDIT_START:
            return state.setIn(['editData', 'isLoaded'], false).setIn(['saveEditInfo', 'isLoaded'], false);
        case FETCH_EDIT_SUCCESS:
            return state.set('editData', action.paload).setIn(['editData', 'isLoaded'], true);
        case FETCH_EDIT_ERROR:
            return state.setIn(['editData', 'error'], action.paload);

        case SAVE_EDITINPUTINFO_START:
            return state.setIn(['ediData', 'isLoaded'], false).setIn(['saveEditInfo', 'isLoaded'], false);
        case SAVE_EDITINPUTINFO_SUCCESS:
            return state.set('saveEditInfo', action.paload).setIn(['ediData', 'isLoaded'], false).setIn(['saveEditInfo', 'isLoaded'], true);
        case SAVE_EDITINPUTINFO_ERROR:
            return state.setIn(['saveEditInfo', 'error'], action.paload);

        default:
            return state;
    }
};