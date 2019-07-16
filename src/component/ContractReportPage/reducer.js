import {
    FETCH_CONTRACTREPORTPAGE_START, FETCH_CONTRACTREPORTPAGE_SUCCESS, FETCH_CONTRACTREPORTPAGE_ERROR,
    FETCH_DEPREPORT_START, FETCH_DEPREPORT_SUCCESS, FETCH_DEPREPORT_ERROR
} from '../../../src/common/API';
import { Map } from 'immutable';
const initState = Map({
    code: "0",
    data: [],
    label: "",
    message: "",
    name: "",
    isLoaded: false,
    detailInfo: {
        isLoaded: false,
        data: []
    }
});

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_CONTRACTREPORTPAGE_START:
            return initState;
        case FETCH_CONTRACTREPORTPAGE_SUCCESS:
            return state.merge(action.paload).set('isLoaded', true);
        case FETCH_CONTRACTREPORTPAGE_ERROR:
            const newState = initState;
            return newState.set('error', action.paload);

        case FETCH_DEPREPORT_START:
            return state;
        case FETCH_DEPREPORT_SUCCESS:
            return state.setIn(['detailInfo', 'isLoaded'], true).set(['detailInfo', 'data'], action.paload);
        case FETCH_DEPREPORT_ERROR:
            const depreportState = initState;
            return depreportState.setIn(['detailInfo', 'error'], action.paload);
            
        default:
            return initState;
    }
};
