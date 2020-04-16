import React, { Component } from "react";
import { Row, Button, Form, Input } from 'antd';
const { TextArea } = Input;

class MyTextArea extends Component {
    handleSubmit = (event, buttonTag) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values, buttonTag);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <Row>
                <Row style={{ background: '#e2e5e9', marginBottom: "10px" }}><h3>审批意见</h3></Row>
                <Form.Item style={{ marginBottom: '0px' }}>
                    {getFieldDecorator('message', {
                        rules: [{ required: false, message: 'Please input your Password!' }],
                        initialValue: "无"
                    })(<TextArea rows={4} />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={event => this.handleSubmit(event, "1")}>审核通过</Button>
                    <Button type="primary" style={{ marginLeft: '20px' }} onClick={event => {
                        this.props.showModal();
                        this.handleSubmit(event, '0');
                    }}>审核不通过</Button>
                </Form.Item>
            </Row>
        </Form>
    }
}

export default Form.create({ name: "textArea" })(MyTextArea);