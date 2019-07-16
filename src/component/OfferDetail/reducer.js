import {
    FETCH_OFFERDETAIL_START, FETCH_OFFERDETAIL_SUCCESS, FETCH_OFFERDETAIL_ERROR,
    FETCH_OFFERTABS_START, FETCH_OFFERTABS_SUCCESS, FETCH_OFFERTABS_ERROR
} from '../../../src/common/API';
import { Map } from 'immutable';
import { formatOfferDetailData } from '../../common/util/formatData';
const initState = Map({
    isLoaded: false,
    data: {},
    head: [],
    tabs: {
        isLoaded: false,
        code: 0,
        message: '',
        spaces: []
    }
});

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_OFFERDETAIL_START:
            return initState;
        case FETCH_OFFERDETAIL_SUCCESS:
            return state.merge(formatOfferDetailData(action.paload)).set('isLoaded', true);
        case FETCH_OFFERDETAIL_ERROR:
            const newState = initState;
            return newState.set('error', action.paload);

        case FETCH_OFFERTABS_START:
            return state.setIn(['tabs', 'isLoaded'], false);
        case FETCH_OFFERTABS_SUCCESS:
            return state.set('tabs', action.paload).setIn(['tabs', 'isLoaded'], true);
        case FETCH_OFFERTABS_ERROR:
            return state.setIn(['tabs', 'error'], action.paload);

        default:
            return initState;
    }
};
