import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './component/Login';
import Main from './component/Main';
import NoMatch from './component/NoMatch';
import { getItem } from './common/util/util';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (<Route
        {...rest}
        render={props => getItem('access_token') ? (<Component {...props} />) : (<Redirect to={{ pathname: "/" }} />)}
    />);
};

export default (props) => {
    return (
        <Provider store={props.store}>
            <Router history={props.history}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <PrivateRoute path="/home" component={Main} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </Provider>
    )
};