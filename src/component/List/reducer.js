import {
    FETCH_LIST_START, FETCH_LIST_SUCCESS, FETCH_LIST_ERROR,
    FETCH_TABLEVIEW_START, FETCH_TABLEVIEW_SUCCESS, FETCH_TABLEVIEW_ERROR,
    FETCH_LISTPOPFORM_START, FETCH_LISTPOPFORM_SUCCESS, FETCH_LISTPOPFORM_ERROR
} from '../../../src/common/API';
import { Map } from 'immutable';
const initState = Map({
    listData: {
        pageButton: [],
        bottomPageButton: [],
        listPageButton: [],
        head: [],
        model: "",
        name: "",
        url: "",
        openSearchIndex: null,
        queryUrl: "",
        applicationClass: "",
        usermarkField: null,
        serverBeforeJS: null,
        serverAfterJS: null,
        webJS: null,
        data: { list: [] },
        isLoaded: false,
    },
    table: {
        isLoaded: false,
        tableData: []
    },
    popForm: {
        applicationClass: '',
        isLoaded: false,
        data: {},
        head: [],
        model: '',
        name: '',
        pageButton: [],
        url: '',
        webJS: null,
    }
});

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_TABLEVIEW_START:
            return state.setIn(['table', 'isLoaded'], false);
        case FETCH_TABLEVIEW_SUCCESS:
            return state.setIn(['table', 'isLoaded'], true).setIn(['table', 'tableData'], action.paload);
        case FETCH_TABLEVIEW_ERROR:
            return state;

        case FETCH_LIST_START:
            return state.setIn(['listData', 'isLoaded'], false);
        case FETCH_LIST_SUCCESS:
            return state.set('listData', action.paload).setIn(['listData', 'isLoaded'], true);
        case FETCH_LIST_ERROR:
            return state.setIn(['listData', 'error'], action.paload);

        case FETCH_LISTPOPFORM_START:
            return state.setIn(['popForm', 'isLoaded'], false);
        case FETCH_LISTPOPFORM_SUCCESS:
            return state.set('popForm', state.get('popForm').merge(action.paload).set('isLoaded', true));
        case FETCH_LISTPOPFORM_ERROR:
            return state.setIn(['popForm', 'error'], action.paload);

        default:
            return state;
    }
};
