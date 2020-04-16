import {
    SAVEORUPDATE_START, SAVEORUPDATE_SUCCESS, SAVEORUPDATE_ERROR,
    DELETE_START, DELETE_SUCCESS, DELETE_ERROR, DELETE_RESET
} from '../../../src/common/API';
import { Map } from 'immutable';
const initState = Map({
    saveOrUpdate: {
        isLoaded: false,
        isSubmit: true
    },
    delete: {
        isLoaded: false,
        deleteId: "",
        message: ""
    },
});

export default (state = initState, action) => {
    switch (action.type) {
        case SAVEORUPDATE_START:
            return state.setIn(['saveOrUpdate', 'isLoaded'], true).setIn(['saveOrUpdate', 'isSubmit'], false);
        case SAVEORUPDATE_SUCCESS:
            return state.set('saveOrUpdate', action.paload).setIn(['saveOrUpdate', 'isLoaded'], false).setIn(['saveOrUpdate', 'isSubmit'], true);
        case SAVEORUPDATE_ERROR:
            return state.setIn(['saveOrUpdate', 'error'], action.paload);

        case DELETE_START:
            return state.setIn(['delete', 'isLoaded'], false);
        case DELETE_SUCCESS:
            return state.set('delete', action.paload).setIn(['delete', 'isLoaded'], true);
        case DELETE_ERROR:
            return state.set(['delete', 'error'], action.paload);

        case DELETE_RESET:
            return state.setIn(['delete', 'isLoaded'], false);

        default:
            return state;
    }
};