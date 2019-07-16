import React from "react";
import PropTypes from 'prop-types';
import { Form, Modal, Spin } from 'antd';
import TableView from './TableView';
/**
 * 此组件为无状态组件，但是为了使用antd Form的wrappedComponentRef方法，所以使用了extends的方式。请不要改装成纯函数的方式！
 */
class PopForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxs: []
        }
    }
    getCheckBox(event) {
        this.setState({
            checkBoxs: event
        })
    }
    render() {
        const { visible, onCancel, onCreate, /*form,*/ data, title, okButtonIsLoaded } = this.props;
        // const { getFieldDecorator } = form;
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
                    <TableView {...this.props} data={data} getCheckBox={this.getCheckBox} selectChange={this.selectChange} />
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