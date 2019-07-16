import React from "react";
import ContractReportPage from './component/ContractReportPage';
import { connect } from 'react-redux';

export default connect(state => { return { ContractReportPage: state.get('ContractReportPage') } })(props => <ContractReportPage {...props} key={props.location.pathname} />);