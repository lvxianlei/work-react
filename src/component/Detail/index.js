import React from "react";
import Detail from './component/Detail';
import { connect } from 'react-redux';

export default connect(state => { return { Detail: state.get('Detail') } })(props => <Detail {...props} key={props.location.pathname} />);