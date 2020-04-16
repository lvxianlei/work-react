import React from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm'
const { TabPane } = Tabs;
export default class SearchPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource
        }
    }
    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    };

    handleReset() {
        this.props.form.resetFields();
    }

    render() {
        const { dataSource } = this.state
        return (
            <Tabs defaultActiveKey="默认" onChange={this.props.onChange}>
                {dataSource.map(item => <TabPane tab={item.name} key={item.name}>
                    <SearchForm dataSource={item.doQueryConditions} />
                </TabPane>)}
            </Tabs>
        );
    }
}

SearchPane.propTypes = {
    dataSource: PropTypes.array.isRequired
}