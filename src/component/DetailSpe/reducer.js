import {

    FETCH_DETAILSPE_START,
    FETCH_DETAILSPE_SUCCESS,
    FETCH_DETAILSPE_ERROR,

    FETCH_FLOWINSTANCELOGS_START,
    FETCH_FLOWINSTANCELOGS_SUCCESS,
    FETCH_FLOWINSTANCELOGS_ERROR,

    SUBMIT_CHANGEFLOWSTATUS_START,
    SUBMIT_CHANGEFLOWSTATUS_SUCCESS,
    SUBMIT_CHANGEFLOWSTATUS_ERROR

} from '../../../src/common/API';
import { Map } from 'immutable';
import { formatDetailSpe, statusOption } from '../../common/util/formatData';
const initState = Map({
    isLoaded: false,
    head: [],
    data: {},
    statusOption,
    flowActivityInstance: {},
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
    },
    changeFlowStatus: {
        isLoaded: false,
        code: 0,
        data: {},
        message: ''
    }
});

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_DETAILSPE_START:
            return state;
        case FETCH_DETAILSPE_SUCCESS:
            return state.merge(formatDetailSpe(action.paload)).set('isLoaded', true);
        case FETCH_DETAILSPE_ERROR:
            return state.set('error', action.paload);

        case FETCH_FLOWINSTANCELOGS_START:
            return state;
        case FETCH_FLOWINSTANCELOGS_SUCCESS:
            return state.set('flowInstanceLogs', action.paload).setIn(['flowInstanceLogs', 'isLoaded'], true);
        case FETCH_FLOWINSTANCELOGS_ERROR:
            return state.setIn(['flowInstanceLogs', 'error'], action.paload);

        case SUBMIT_CHANGEFLOWSTATUS_START:
            return state;
        case SUBMIT_CHANGEFLOWSTATUS_SUCCESS:
            return state.set('changeFlowStatus', action.paload).setIn(['changeFlowStatus', 'isLoaded'], true);
        case SUBMIT_CHANGEFLOWSTATUS_ERROR:
            return state.setIn(['changeFlowStatus', 'error'], action.paload);


        default:
            return state;
    }
};
