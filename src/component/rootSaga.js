import { all } from 'redux-saga/effects';
import LoginSaga from './Login/saga';
import MainSaga from './Main/saga';
import ListSaga from './List/saga';
import ContractReportPageSaga from './ContractReportPage/saga';
import DetailSaga from './Detail/saga';
import DetailSpeSaga from './DetailSpe/saga';
import EditSaga from './Edit/saga';
import SelefButtonSaga from './SelefButton/saga';
import OfferDetailSaga from './OfferDetail/saga';
import PageFormSettingSaga from './PageFormSetting/saga';

export default function* rootSaga() {
    yield all([
        LoginSaga(),
        MainSaga(),
        ListSaga(),
        ContractReportPageSaga(),
        DetailSaga(),
        EditSaga(),
        SelefButtonSaga(),
        DetailSpeSaga(),
        OfferDetailSaga(),
        PageFormSettingSaga(),
    ]);
}