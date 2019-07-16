import {
    DELETE_START, DELETE_SUCCESS, DELETE_ERROR,
    SAVEORUPDATE_START, SAVEORUPDATE_SUCCESS, SAVEORUPDATE_ERROR
} from '../../../src/common/API';
import { Map } from 'immutable';
const initState = Map({
    delete: {
        isLoaded: false,
    },
    saveOrUpdate: {
        isLoaded: false,
        isSubmit: true
    }
});

export default (state = initState, action) => {
    switch (action.type) {
        case DELETE_START:
            return state.set('delete', { isLoaded: false });
        case DELETE_SUCCESS:
            return state.set('delete', action.paload);
        case DELETE_ERROR:
            return state.set(['delete', 'error'], action.paload);
        
        case SAVEORUPDATE_START:
            return state.set('saveOrUpdate', { isLoaded: true, isSubmit: false });
        case SAVEORUPDATE_SUCCESS:
            return state.set('saveOrUpdate', action.paload).setIn(['saveOrUpdate', 'isLoaded'], false).setIn(['saveOrUpdate', 'isSubmit'], true);
        case SAVEORUPDATE_ERROR:
            return state.setIn(['saveOrUpdate', 'error'], action.paload);
        default:
            return state;
    }
};