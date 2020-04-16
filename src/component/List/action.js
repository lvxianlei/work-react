import {
    FETCH_LIST_START,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_ERROR,
    FETCH_TABLEVIEW_START,
    FETCH_TABLEVIEW_SUCCESS,
    FETCH_TABLEVIEW_ERROR,
    FETCH_LISTPOPFORM_START,
    FETCH_LISTPOPFORM_SUCCESS,
    FETCH_LISTPOPFORM_ERROR,
    DELETE_LIST_START,
    DELETE_LIST_SUCCESS,
    DELETE_LIST_ERROR,
    SAVE_POPFORM_START,
    SAVE_POPFORM_SUCCESS,
    SAVE_POPFORM_ERROR
} from '../../../src/common/API'

export function fetchListStart(paload) {
    return {
        type: FETCH_LIST_START,
        paload
    }
}

export function fetchListSuccess(paload) {
    return {
        type: FETCH_LIST_SUCCESS,
        paload
    }
}

export function fetchListError(paload) {
    return {
        type: FETCH_LIST_ERROR,
        paload
    }
}

export function fetchTableViewStart(paload) {
    return {
        type: FETCH_TABLEVIEW_START,
        paload
    }
}

export function fetchTableViewSuccess(paload) {
    return {
        type: FETCH_TABLEVIEW_SUCCESS,
        paload
    }
}

export function fetchTableViewError(paload) {
    return {
        type: FETCH_TABLEVIEW_ERROR,
        paload
    }
}

export function fetchListPopFormStart(paload) {
    return {
        type: FETCH_LISTPOPFORM_START,
        paload
    }
}

export function fetchListPopFormSuccess(paload) {
    return {
        type: FETCH_LISTPOPFORM_SUCCESS,
        paload
    }
}

export function fetchListPopFormError(paload) {
    return {
        type: FETCH_LISTPOPFORM_ERROR,
        paload
    }
}

export function deleteListStart(paload) {
    return {
        type: DELETE_LIST_START,
        paload
    }
}

export function deleteListSuccess(paload) {
    return {
        type: DELETE_LIST_SUCCESS,
        paload
    }
}

export function deleteListError(paload) {
    return {
        type: DELETE_LIST_ERROR,
        paload
    }
}

export function savePopFormStart(paload) {
    return {
        type: SAVE_POPFORM_START,
        paload
    }
}

export function savePopFormSuccess(paload) {
    return {
        type: SAVE_POPFORM_SUCCESS,
        paload
    }
}

export function savePopFormError(paload) {
    return {
        type: SAVE_POPFORM_ERROR,
        paload
    }
}


