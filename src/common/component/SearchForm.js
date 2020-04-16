import React from 'react';
import { Form, Row, Col, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import { FormType } from '../Type';
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource
    }
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    const { dataSource } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSearch} className="ant-advanced-search-form">
        <Row gutter={24}>
          {dataSource.map(formItem => <Col span={4} key={formItem.id + formItem.name}>
            <Form.Item label={formItem.label.slice(0, formItem.label.indexOf('('))}>
              {getFieldDecorator(formItem.name, {
                initialValue: null
              })(FormType(formItem))}
            </Form.Item>
          </Col>)}
        </Row>
        {dataSource.length > 0 && <Row>
          <Col span={24} style={{ textAlign: 'left' }}>
            <Button type="primary" htmlType="submit"><Icon type='search' />查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清除</Button>
          </Col>
        </Row>}

      </Form>
    );
  }
}

export default Form.create({ name: 'advanced_search' })(SearchForm);

SearchForm.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onSearch: PropTypes.func
}