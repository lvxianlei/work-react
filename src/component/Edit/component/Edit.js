import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Spin, Form, Row, Col } from 'antd';
import { push } from 'react-router-redux';
import { is } from "immutable";
import { fetchEditStart, fetchPwdInfo } from '../action';
import { formItemType } from '../../../common/util/util';
import moment from 'moment';
import SelefButton from '../../SelefButton';
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editData: this.props.Edit,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let path = this.props.location.state.linkUrl;
    path ? this.props.dispatch(fetchEditStart(`${path.slice(0, 1) === '/' ? path : `/${path}`}`)) : this.props.dispatch(fetchPwdInfo());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Edit.get('error')) {
      this.props.dispatch(push(`/home/nomatch/${nextProps.Edit.get('error').status}`));
    }
    !is(this.state.editData, nextProps.Edit) && this.setState({ editData: nextProps.Edit });
  }

  // componentWillUnmount() {
  //   confirm({
  //     title: '您即将离开?',
  //     content: 'Some descriptions',
  //     onOk() {
  //       console.log('OK');
  //     },
  //     onCancel() {
  //       console.log('Cancel');
  //     },
  //   });
  // }

  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { editData } = this.state;
    const formList = editData.get('head').filter(item => item.position !== '0');
    const data = editData.get('data');
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin className="mainList" size="large" spinning={!editData.get('isLoaded')}>
        <Form
          labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
          onSubmit={this.handleSubmit}
        >
          <Row gutter={16}>
            {formList.map(item => {
              return (<Col key={item.name} span={12} ><Form.Item label={item.label}>
                {getFieldDecorator(item.name, {
                  rules: [{ required: item.must !== "0", message: `${item.label}为必填项` }],
                  initialValue: item.type === 'date' ? moment(moment(data[item.name]).format(item.dateFormat), item.dateFormat) : data[item.name]
                })(formItemType(item))}
              </Form.Item></Col>)
            })}
          </Row>
          {editData.get('extraData').map(item => (<Row style={{ marginTop: 10, borderTop: '3px solid #f0f2f5', paddingTop: 10 }} gutter={16} key={item.name}>
            {item.head.filter(item => item.position !== "0").map(item => {
              return (<Col key={item.name} span={12} ><Form.Item label={item.label}>
                {getFieldDecorator(item.name, {
                  rules: [{ required: item.must !== "0", message: `${item.label}为必填项` }],
                  initialValue: item.type === 'date' ? moment(moment(data[item.name]).format(item.dateFormat), item.dateFormat) : data[item.name]
                })(formItemType(item))}
              </Form.Item></Col>)
            })}
          </Row>))}
          <Row className="pageButtons edit" type="flex" justify="center">{editData.get('pageButton').map(item => (<Col span={3} key={item.name}><Form.Item
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 16 }
            }}
          >
            <SelefButton {...item} data={item}>{item.name}</SelefButton>
          </Form.Item></Col>))}</Row>
        </Form>
      </Spin>
    )
  }
}

Edit.propTypes = {
  Edit: PropTypes.object.isRequired
}
export default Form.create({ name: 'edit' })(Edit);