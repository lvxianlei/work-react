import React from "react";
import OfferDetail from './component/OfferDetail';
import { connect } from 'react-redux';

export default connect(state => { return { OfferDetail: state.get('OfferDetail') } })(props => <OfferDetail {...props} key={props.location.pathname} />);