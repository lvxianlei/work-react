import {
    FETCH_DETAILSPE_START,
    FETCH_DETAILSPE_SUCCESS,
    FETCH_DETAILSPE_ERROR,
    FETCH_FLOWINSTANCELOGS_START,
    FETCH_FLOWINSTANCELOGS_SUCCESS,
    FETCH_FLOWINSTANCELOGS_ERROR
} from '../../../src/common/API';
import { Map } from 'immutable';
import { formatDetailSpe, statusOption } from '../../common/util/formatData';
const initState = Map({
    isLoaded: false,
    head: [],
    data: {},
    statusOption,
    flowActivityInstances: [],
    flowInstanceLogs: {
        applicationClass: '',
        isLoaded: false,
        data: {},
        head: [],
        model: '',
        name: '',
        pageButton: [],
        url: '',
        webJS: null
    }
});

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_DETAILSPE_START:
            return initState;
        case FETCH_DETAILSPE_SUCCESS:
            return state.merge(formatDetailSpe(action.paload)).set('isLoaded', true);
        case FETCH_DETAILSPE_ERROR:
            const newState = initState;
            return newState.set('error', action.paload);

        case FETCH_FLOWINSTANCELOGS_START:
            return initState;
        case FETCH_FLOWINSTANCELOGS_SUCCESS:
            return state.set('flowInstanceLogs', action.paload).setIn(['flowInstanceLogs', 'isLoaded'], true);
        case FETCH_FLOWINSTANCELOGS_ERROR:
            const logs = initState;
            return logs.setIn(['flowInstanceLogs', 'error'], action.paload);

        default:
            return state;
    }
};
