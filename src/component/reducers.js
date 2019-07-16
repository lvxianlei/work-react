import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import Login from './Login/reducer';
import Main from './Main/reducer';
import List from './List/reducer';
import ContractReportPage from './ContractReportPage/reducer';
import Detail from './Detail/reducer';
import DetailSpe from './DetailSpe/reducer';
import Edit from './Edit/reducer';
import SelefButton from './SelefButton/reducer';
import OfferDetail from './OfferDetail/reducer';
import PageFormSetting from './PageFormSetting/reducer';

import { LOCATION_CHANGE } from 'react-router-redux';
const initialState = Map({
    location: null,
    action: null
});

function routerReducer(state = initialState, { type, payload = {} } = {}) {
    if (type === LOCATION_CHANGE) {
        const location = payload.location || payload;
        const action = payload.action;
        return state.set('location', location).set('action', action);
    }
    return state;
}

export default combineReducers({
    routing: routerReducer,
    Login,
    Main,
    List,
    ContractReportPage,
    Detail,
    Edit,
    SelefButton,
    DetailSpe,
    OfferDetail,
    PageFormSetting,
});