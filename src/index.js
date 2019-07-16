import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import './sass/index.scss';
import Root from './router.js';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './component/reducers';
import rootSaga from './component/rootSaga';
import * as serviceWorker from './serviceWorker';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const browserHistory = createBrowserHistory();

const routerWare = routerMiddleware(browserHistory)

const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = createLogger({
    stateTransformer: state => state.toJS()
});

const store = { ...createStore(reducers, Map({}), applyMiddleware(sagaMiddleware, routerWare, loggerMiddleware)), runSaga: sagaMiddleware.run };

store.runSaga(rootSaga);

export default store;

ReactDOM.render(<LocaleProvider locale={zh_CN}><Root store={store} history={browserHistory} /></LocaleProvider>, document.getElementById('root'));

serviceWorker.unregister();
