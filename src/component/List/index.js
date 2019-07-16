import React from "react";
import List from './component/List';
import { connect } from 'react-redux';

export default connect(state => { return { List: state.get('List') } })(props => <List {...props} key={props.location.pathname} />);