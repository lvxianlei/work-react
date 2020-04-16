import {
    FETCH_LIST_START, FETCH_LIST_SUCCESS, FETCH_LIST_ERROR,
    FETCH_TABLEVIEW_START, FETCH_TABLEVIEW_SUCCESS, FETCH_TABLEVIEW_ERROR,
    FETCH_LISTPOPFORM_START, FETCH_LISTPOPFORM_SUCCESS, FETCH_LISTPOPFORM_ERROR,
    DELETE_LIST_START, DELETE_LIST_SUCCESS, DELETE_LIST_ERROR,
    SAVE_POPFORM_START, SAVE_POPFORM_SUCCESS, SAVE_POPFORM_ERROR
} from '../../../src/common/API';
import { Map } from 'immutable';
import { message } from 'antd';
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
    },
    isDelete: {
        deleteId: '',
        message: '',
        isLoaded: false,
    },
    isSavePopForm: {
        isLoaded: false,
        saveFormId: '',
        message: ''
    }
});

const deleteListItem = (action, state) => {
    const { listData, isDelete } = state.toJS()
    const deleteId = isDelete.deleteId
    const tableData = listData.data;
    message.success('数 据 成 功 删 除 ! ');
    const linkUrls = deleteId.linkUrl.split('/')
    const dataId = linkUrls.pop()
    const newTableData = tableData.list.filter(dataItem => dataItem.id !== dataId);
    return newTableData
}

const savePopForm = (action, state) => {
    const { listData } = state.toJS()
    const { id, data } = action
    const saveData = data.data
    message.success('数 据 保 存 成 功 ! ');
    const newListItem = listData.data.list.map(item => {
        if (item.id === id) {
            for (let key in item) {
                if (saveData[key]) {
                    item[key] = saveData[key]
                }
            }
        }
        return item
    })
    return newListItem
}

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_LIST_START:
            const isLoadQuery = action.paload.loadeQueryTag;
            return isLoadQuery ? state.setIn(['listData', 'isLoaded'], false) : state.setIn(['listData', 'isLoaded'], false).setIn(['table', 'isLoaded'], false);
        case FETCH_LIST_SUCCESS:
            return state.set('listData', action.paload).setIn(['listData', 'isLoaded'], true);
        case FETCH_LIST_ERROR:
            return state.setIn(['listData', 'error'], action.paload);

        case FETCH_TABLEVIEW_START:
            return state.setIn(['table', 'isLoaded'], false);
        case FETCH_TABLEVIEW_SUCCESS:
            return state.setIn(['table', 'tableData'], action.paload).setIn(['table', 'isLoaded'], true);
        case FETCH_TABLEVIEW_ERROR:
            return state;

        case FETCH_LISTPOPFORM_START:
            return state.setIn(['popForm', 'isLoaded'], false);
        case FETCH_LISTPOPFORM_SUCCESS:
            return state.set('popForm', action.paload).setIn(['popForm', 'isLoaded'], true);
        case FETCH_LISTPOPFORM_ERROR:
            return state.setIn(['popForm', 'error'], action.paload);

        case DELETE_LIST_START:
            return state.setIn(['isDelete', 'isLoaded'], false).setIn(['isDelete', 'deleteId'], action.paload.deleteId);
        case DELETE_LIST_SUCCESS:
            return state.setIn(['isDelete', 'message'], action.paload)
                .setIn(['isDelete', 'isLoaded'], true)
                .setIn(['listData', 'data', 'list'], deleteListItem(action, state))
        case DELETE_LIST_ERROR:
            return state.setIn(['isDelete', 'message'], action.paload);

        case SAVE_POPFORM_START:
            return state.setIn(['isDelete', 'isLoaded'], false).setIn(['popForm', 'isLoaded'], false);
        case SAVE_POPFORM_SUCCESS:

            return state.setIn(['isSavePopForm', 'isLoaded'], true).setIn(['listData', 'data', 'list'], savePopForm(action.paload, state))
        case SAVE_POPFORM_ERROR:
            return state.setIn(['isSavePopForm', 'message'], action.paload);
        default:
            return state;
    }
};
