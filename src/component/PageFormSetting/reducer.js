import {
    FETCH_PAGEFORMSETTING_START,
    FETCH_PAGEFORMSETTING_SUCCESS,
    FETCH_PAGEFORMSETTING_ERROR,
    SAVE_PAGEFORMSETTING_START,
    SAVE_PAGEFORMSETTING_SUCCESS,
    SAVE_PAGEFORMSETTING_ERROR,
} from '../../../src/common/API';
import { Map } from 'immutable';
const initState = Map({
    fields: [],
    page: { pageFieldPositions: [] },
    pages: [],
    isLoaded: false,
    isSubmitSetting: false
});

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_PAGEFORMSETTING_START:
            return state.set('isLoaded', false);
        case FETCH_PAGEFORMSETTING_SUCCESS:
            return state.mergeDeep(action.paload).set('isLoaded', true);
        case FETCH_PAGEFORMSETTING_ERROR:
            return state.set('error', action.paload);

        case SAVE_PAGEFORMSETTING_START:
            return state.set('isSubmitSetting', false);
        case SAVE_PAGEFORMSETTING_SUCCESS:
            return state.set('isSubmitSetting', true);
        case SAVE_PAGEFORMSETTING_ERROR:
            return state.set('submitSettingError', action.paload);
        default:
            return state;
    }
};