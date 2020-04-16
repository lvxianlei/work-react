import React, { Component } from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
import { loginStart } from '../action';
import { push } from 'react-router-redux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.chooseAlertMesssge = this.chooseAlertMesssge.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                const conmit = {
                    ...values,
                    scope: 'read',
                    grant_type: 'password',
                    client_id: 'app50jia',
                    si: '54978e5207ba373fa76617dc56a2d279b96b0e17'
                }
                this.props.dispatch(loginStart(conmit));
            }
        });
    }

    chooseAlertMesssge(data) {
        const { status } = data;
        let message = '';
        switch (status) {
            case 400:
                message = "用户不存在";
                break;
            case 401:
                message = "密码错误";
                break;
            case 500:
                message = "服务器错误,请稍后再重新登陆";
                break;
            case 501:
                message = "服务器错误,请稍后再重新登陆";
                break;
            case 502:
                message = "服务器错误,请稍后再重新登陆";
                break;
            default:
                message = "";
        }
        return message;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        nextProps.Login.get('error') && this.setState({ error: nextProps.Login.get('errorInfo'), loading: false });
        nextProps.Login.get('isLogin') && this.props.dispatch(push('/home'));
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { error, loading } = this.state;
        return (
            <div className="login">
                <div className="text-center">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {error ? <Alert message={this.chooseAlertMesssge(error)} type="error" showIcon /> : ''}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input onChange={this.onChange} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input onChange={this.onChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit" className="login-form-button">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}


export default Form.create({ name: 'normal_login' })(Login)

