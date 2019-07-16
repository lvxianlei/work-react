import { FETCH_MAIN_START, FETCH_MAIN_SUCCESS, FETCH_MAIN_ERROR } from '../../../src/common/API';
import { List } from 'immutable';
const initState = List([]);

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_MAIN_START:
            return state;
        case FETCH_MAIN_SUCCESS:
            return state.concat(action.paload);
        case FETCH_MAIN_ERROR:
            return state;
        default:
            return state;
    }
};