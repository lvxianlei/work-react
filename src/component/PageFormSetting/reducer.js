import { FETCH_PAGEFORMSETTING_START, FETCH_PAGEFORMSETTING_SUCCESS, FETCH_PAGEFORMSETTING_ERROR } from '../../../src/common/API';
import { Map } from 'immutable';
const initState = Map({
    fields: [],
    page: { pageFieldPositions: [] },
    pages: [],
    isLoaded: false
});

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_PAGEFORMSETTING_START:
            return state;
        case FETCH_PAGEFORMSETTING_SUCCESS:
            return state.mergeDeep(action.paload).set('isLoaded', true);
        case FETCH_PAGEFORMSETTING_ERROR:
            return state.set('error', action.paload);

        default:
            return state;
    }
};