import React, { Component } from "react";
// import { Radio, Row, Col } from 'antd';
import { fetchContractReportPageStart } from '../action';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Map, is } from "immutable";
import { getItem } from '../../../common/util/util';
// import SelefButton from '../../SelefButton';
export default class ContractReportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: Map(this.props.location.state),
            reportData: this.props.ContractReportPage,
        }
    }

    componentDidMount() {
        const state = getItem('list');
        this.props.dispatch(fetchContractReportPageStart({
            path: this.state.info.get('url') ? this.state.info.get('url') : state,
            data: { current: "1", pageSize: "20", params: {} }
        }));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ContractReportPage.get('error')) {
            this.props.dispatch(push(`/home/nomatch/${nextProps.ContractReportPage.get('error').status}`));
        }
        !is(this.state.reportData, nextProps.ContractReportPage) && this.setState({ reportData: nextProps.ContractReportPage });
    }

    render() {
        // const { reportData } = this.state;
        return (
            <div className="mainList">
               
            </div>
        );
    }
}

ContractReportPage.propTypes = {
    ContractReportPage: PropTypes.object.isRequired
}