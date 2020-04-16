import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Spin, Form, Row, Col, Modal, message as Message } from 'antd';
import BraftEditor from 'braft-editor';
import { push } from 'react-router-redux';
import { Prompt } from 'react-router';
import { is } from "immutable";
import { fetchEditStart, fetchPwdInfo, saveEditInputInfoStart } from '../action';
import { FormType } from '../../../common/Type';

import moment from 'moment';
import SelefButton from '../../SelefButton';
const { confirm } = Modal;
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Edit: this.props.Edit,
      isLeave: true,
      buttonType: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveLoding = ''
  }

  async componentDidMount() {
    let path = this.props.location.state.linkUrl;
    const jsonValue = this.props.location.state.jsonValue;
    path ? this.props.dispatch(fetchEditStart({ path: `${path.slice(0, 1) === '/' ? path : `/${path}`}`, data: { jsonValue: jsonValue ? jsonValue : "" } })) : this.props.dispatch(fetchPwdInfo());
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.Edit.getIn(['editData', 'error'])) {
      this.props.dispatch(push(`/home/nomatch/${nextProps.Edit.getIn(['editData', 'error']).status}`));
    }
    !is(this.state.Edit, nextProps.Edit) && (nextProps.Edit.get('saveEditInfo').isLoaded ? this.setState({ Edit: nextProps.Edit, isLeave: false }) : this.setState({ Edit: nextProps.Edit }));
  }

  handleSubmit(event, buttonType) {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        for (let key in values) {
          if (moment.isMoment(values[key])) {
            values[key] = values[key]._d.getTime();
          }
        }
        const postEdit = this.state.Edit;
        const editData = postEdit.get('editData');
        delete editData.isLoaded;
        const { url, name } = editData;
        const path = `/${url}/base/saveOrUpdate/${name}`;
        for (let key in values) {
          if (editData.data[key] || editData.data[key] + '' === 'null') {
            if (editData.head.filter(item => item.name === key)[0].type === "ueditor") {
              editData.data[key] = values[key].toHTML();
            } else if (editData.head.filter(item => item.name === key)[0].type === "picture") {
              editData.data[key] = values[key][0];
            } else {
              editData.data[key] = values[key]
            }
          } else {
            editData.data[key] = null
          }
        }

        editData.extraData && editData.extraData.forEach(item => {
          for (let key in values) {
            (item.data[key] || item.data[key] + '' === 'null') && (item.data[key] = values[key]);
          }
        });
        console.log('----------', editData)
        this.setState({ buttonType });
        this.saveLoding = Message.loading('正 在 保 存 数 据 ......', 0);
        this.props.dispatch(saveEditInputInfoStart({ path, data: editData }));
      }
    });
  }

  componentDidUpdate() {
    const { Edit, buttonType } = this.state;
    const { history, } = this.props;//location
    const isSaved = Edit.get('saveEditInfo').isLoaded;
    const { error, code, message } = Edit.get('saveEditInfo');
    if (isSaved && code !== "9999") {
      this.saveLoding();
      Message.success('数 据 保 存 成 功 ! ');
      switch (buttonType) {
        case "save_plist":
          history.go(-1);
          break;
        case "goto_back":
          history.go(-1);
          break;
        case "save_view":

          break;
        default:
          return;
      }
    } else if (isSaved && code === "9999") {
      this.saveLoding();
      Message.error(message);
    } else if (error) {
      this.saveLoding();
      Message.error('数 据 保 存 失 败 ! ');
    }
  }

  initialValueGenerator(value, data) {
    let initVal;
    if (value.type === 'date') {
      const dateInfo = data[value.name];
      initVal = dateInfo && + '' !== "null" ? moment(moment(dateInfo).format(value.dateFormat), value.dateFormat) : undefined;
    } else if (value.type === "areaLinkage") {
      const areaLinkageVal = data[value.name];
      if (areaLinkageVal + '' === 'null') {
        initVal = null;
      } else if (data[value.name] instanceof Array) {
        initVal = data[value.name];
      } else {
        initVal = data[value.name].split('/ ');
      }
    } else if (value.type === "ueditor") {
      initVal = BraftEditor.createEditorState(data[value.name])
    } else if (value.type === 'picture') {
      initVal = [{ ...data[value.name], uid: '01' }]
    } else {
      initVal = data[value.name] + '' === 'null' ? undefined : data[value.name];
    }
    return initVal;
  }

  render() {
    const { Edit, isLeave } = this.state;
    const { head, data, isLoaded, extraData, pageButton } = Edit.get('editData');
    const formList = head.filter(item => item.position !== '0');
    const { getFieldDecorator } = this.props.form;
    const that = this;
    return (
      <Spin className="mainList" size="large" spinning={!isLoaded}>
        <Prompt when={isLeave} message={location => {
          if (location.pathname === "/home/nomatch/500") {
            return true
          }
          confirm({
            title: '数据未保存，您确定仍要要离开吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              that.setState({ isLeave: false }, () => that.props.dispatch(push(location.pathname)));
            }
          });
          return false;
        }} />
        <Form
          labelCol={{ sm: { span: 10 } }}
          wrapperCol={{ sm: { span: 12 } }}
          onSubmit={this.handleSubmit}
        >
          <Row gutter={16}>
            {formList.map((item, index) => {
              return (<Col key={item.name + index} span={12} ><Form.Item label={item.label}>
                {getFieldDecorator(item.name, item.type === "picture" ? {
                  initialValue: this.initialValueGenerator(item, data),
                  valuePropName: 'fileList',
                  getValueFromEvent: event => {
                    if (event.file.status === 'done') {
                      const fileList = event.file.response
                      if (fileList.success) {
                        return [{ url: fileList.url, name: fileList.name, uid: event.file.uid }]
                      }
                    } else {
                      return event && [event.file]
                    }
                  },
                } : {
                    rules: [{ required: item.must !== "0", message: `${item.label}为必填项` }],
                    initialValue: this.initialValueGenerator(item, data)
                  })(FormType(item))}
              </Form.Item></Col>)
            })}
          </Row>
          {extraData && extraData.map(item => (<Row style={{ marginTop: 10, borderTop: '3px solid #f0f2f5', paddingTop: 10 }} gutter={16} key={item.name}>
            {item.head.filter(head => head.position !== "0").map(headItem => {
              let getFieldProps;
              switch (headItem.type) {
                case "picture":
                  getFieldProps = {
                    initialValue: this.initialValueGenerator(headItem, item.data),
                    valuePropName: 'fileList',
                    getValueFromEvent: event => {
                      if (event.file.status === 'done') {
                        const fileList = event.file.response
                        if (fileList.success) {
                          return [{ url: fileList.url, name: fileList.name, uid: event.file.uid }]
                        }
                      } else {
                        return event && [event.file]
                      }
                    },
                  };
                  break;
                case "ueditor":
                  getFieldProps = {
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: true,
                      validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                          callback('请输入正文内容')
                        } else {
                          callback()
                        }
                      }
                    }],
                    id: headItem.name + headItem.position,
                    initialValue: this.initialValueGenerator(headItem, item.data),
                    getValueFromEvent: event => {
                      console.log('ueditor event:', event);
                    }
                  }
                  break;
                default:
                  getFieldProps = {
                    rules: [{ required: headItem.must !== "0", message: `${headItem.label}为必填项` }],
                    id: headItem.name + headItem.position,
                    initialValue: this.initialValueGenerator(headItem, item.data),
                  }
              }
              return (<Col key={headItem.name} span={12} ><Form.Item label={headItem.label}>
                {getFieldDecorator(headItem.name, getFieldProps)(FormType(headItem))}
              </Form.Item></Col>)
            })}
          </Row>))}
          <Row className="pageButtons edit" type="flex" justify="center">{pageButton.map(item => (<Col span={3} key={item.name}><Form.Item>
            <SelefButton onSubmit={this.handleSubmit} {...item} data={item}>{item.name}</SelefButton>
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