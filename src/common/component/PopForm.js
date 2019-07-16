import React from "react";
import PropTypes from 'prop-types';
import { Form, Modal, Spin } from 'antd';
import { formItemType } from '../util/util';

/**
 * 此组件为无状态组件，但是为了使用antd Form的wrappedComponentRef方法，所以使用了extends的方式。请不要改装成纯函数的方式！
 */
class PopForm extends React.Component {
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
              data.get('head').filter(item => item.position !== "0").map(item => (
                <Form.Item key={item.name} label={item.label}>
                  {getFieldDecorator(item.name, {
                    rules: [{ required: true, message: 'Please input the title of collection!' }]
                  })(formItemType(item))}
                </Form.Item>
              ))
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