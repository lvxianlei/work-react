import React from "react";
import DetailSpe from './component/DetailSpe';
import { connect } from 'react-redux';

export default connect(state => { return { DetailSpe: state.get('DetailSpe') } })(props => <DetailSpe {...props} key={props.location.pathname} />);