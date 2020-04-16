import React from "react";
import PropTypes from 'prop-types';
import { Form, Modal, Spin } from 'antd';
import { FormType } from '../Type';
import BraftEditor from 'braft-editor';
import moment from 'moment';
/**
 * 此组件为无状态组件，但是为了使用antd Form的wrappedComponentRef方法，所以使用了extends的方式。请不要改装成纯函数的方式！
 */
class PopForm extends React.Component {

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
      initVal = data[value.name] + '' === null ? [] : [{ ...data[value.name], uid: '01' }]
    } else {
      initVal = data[value.name] + '' === 'null' ? undefined : data[value.name];
    }
    return initVal;
  }

  render() {
    const { visible, onCancel, onCreate, form, data, title, okButtonIsLoaded } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={title}
        confirmLoading={okButtonIsLoaded}
        cancelText="取消"
        okText="确定"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Spin size="large" spinning={!data.get('isLoaded')}>
          <Form layout="horizontal" >
            {
              data.get('head').filter(item => item.position !== "0").map(headItem => {
                let getFieldProps;
                switch (headItem.type) {
                  case "picture":
                    getFieldProps = {
                      initialValue: this.initialValueGenerator(headItem, data.get('data')),
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
                      initialValue: this.initialValueGenerator(headItem, data.get('data')),
                      getValueFromEvent: event => {
                        console.log('ueditor event:', event);
                      }
                    }
                    break;
                  default:
                    getFieldProps = {
                      rules: [{ required: headItem.must !== "0", message: `${headItem.label}为必填项` }],
                      id: headItem.name + headItem.position,
                      initialValue: this.initialValueGenerator(headItem, data.get('data')),
                    }
                }
                return (
                  <Form.Item key={headItem.name} label={headItem.label}>
                    {getFieldDecorator(headItem.name, getFieldProps)(FormType(headItem))}
                  </Form.Item>
                )
              })
            }
          </Form>
        </Spin>
      </Modal>
    );
  }
}


PopForm.propTypes = {
  onCancel: PropTypes.func,
  onCreate: PropTypes.func,
  visible: PropTypes.bool,
  title: PropTypes.string
}
export default Form.create({ name: 'pop_form' })(PopForm);