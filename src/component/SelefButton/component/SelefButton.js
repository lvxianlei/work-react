import React, { Component } from 'react';
import { Button, Modal, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Map, is } from 'immutable';
import { saveOrUpdateStart } from '../action';
const confirm = Modal.confirm;
/**
 * buttonType保存了所有要返回的button类型type属性和所要进行的操作
 */
const buttonType = {
    goto_edit: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return disabled ? <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false}>{props.children}</Button> : <Link className="ant-btn ant-btn-link" to={{
                pathname: props.location.pathname + '/edit',
                state: {
                    linkUrl: that.props.linkUrl,
                    jsonValue: that.props.jsonValue
                }
            }}>{props.children}</Link>
        }
    },
    goto_view: {
        render(props) {
            const { that } = props;
            const { disabled, component, linkUrl } = that.props;
            const pathname = component === "/home/formSubItem" ? props.location.pathname + '/offerdetail' : props.location.pathname + '/detail';
            return disabled ? <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false}>{props.children}</Button> : <Link className="ant-btn ant-btn-link" to={{
                pathname,
                state: {
                    url: linkUrl
                }
            }}>{props.children}</Link>
        }
    },
    goto_plist: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return disabled ? <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false}>{props.children}</Button> : <Link className="ant-btn ant-btn-link" to={{
                pathname: props.location.pathname + '/goto_plist',
                state: {
                    url: props.linkUrl
                }
            }}>{props.children}</Link>
        }
    },
    goto_delete: {
        handleClick(event) {
            const { that } = event;
            const { name } = that.props;
            confirm({
                title: name,
                content: `确定要${name}？`,
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    const { data, linkUrl } = that.props;
                    that.props.dispatch(that.props.deleteWay({ path: linkUrl, deleteId: { name: data.get('name'), linkUrl } }));
                }
            })
        },
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data} onClick={() => this.handleClick(props)}>{props.children}</Button>
        }
    },
    goto_batch: {
        handleClick(event) {
            const { that } = event;
            const { checkBoxs, children, name, dispatch, linkUrl, goRefresh } = that.props;
            checkBoxs.length > 0 ?
                confirm({
                    title: children,
                    content: `确认${name}？`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        dispatch(saveOrUpdateStart({
                            path: linkUrl,
                            data: { idList: checkBoxs, viewId: '' },
                            title: children
                        }));
                        goRefresh();
                    }
                }) : Modal.error({
                    title: children,
                    content: `请选择需要${name}的条目!`
                });
        },
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="primary" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} onClick={() => this.handleClick(props)} data={props.data}>{props.children}</Button>
        }
    },
    goto_refresh: {
        handleClick(event) {
            const { that } = event;
            confirm({
                title: `确认${that.props.children}?`,
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    console.log('OK');
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        },
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} onClick={() => this.handleClick(props)} data={props.data}>{props.children}</Button>
        }
    },
    goto_back: {
        render(props) {
            const { that } = props;
            const { disabled, onSubmit } = that.props;
            return <Button onClick={event => { onSubmit(event, 'goto_back') }} className={disabled ? "disabled" : ''} disabled={disabled ? true : false} type="primary">{props.children}</Button>
        }
    },
    pop_plist: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
    pop_singlePlist: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="primary" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
    pop_edit: {
        handleClick(event) {
            const { that } = event;
            that.props.show(that.props);
        },
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} onClick={() => this.handleClick(props)}>{props.children}</Button>
        }
    },
    batch_plist: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="primary" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
    call_up: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
    request_tips: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
    move_up: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
    open_new: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} onClick={() => window.open(props.linkUrl)}>{props.children}</Button>
        }
    },
    open_batch_new: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} onClick={() => window.open(props.linkUrl)}>{props.children}</Button>
        }
    },
    export_current_page: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''}
                disabled={disabled ? true : false}
                onClick={() => window.open(props.linkUrl)}><Icon type="export" />{props.children}</Button>
        }
    },
    save_form: {
        render(props) {
            const { that } = props;
            const { disabled, onSubmit } = that.props;
            return <Button onClick={event => { onSubmit(event, 'save_form') }} className={disabled ? "disabled" : ''} disabled={disabled ? true : false} type="primary">{props.children}</Button>
        }
    },
    save_plist: {
        render(props) {
            const { that } = props;
            const { disabled, onSubmit } = that.props;
            return <Button onClick={event => { onSubmit(event, 'save_plist') }} className={disabled ? "disabled" : ''} disabled={disabled ? true : false} type="primary">{props.children}</Button>
        }
    },
    save_view: {
        render(props) {
            const { that } = props;
            const { disabled, onSubmit } = that.props;
            return <Button onClick={event => { onSubmit(event, 'save_view') }} className={disabled ? "disabled" : ''} disabled={disabled ? true : false} type="primary">{props.children}</Button>
        }
    },
    saveAndGoBack: {
        render(props) {
            const { that } = props;
            const { disabled, onSubmit } = that.props;
            return <Button onClick={event => { onSubmit(event, 'saveAndGoBack') }} className={disabled ? "disabled" : ''} disabled={disabled ? true : false} type="primary">{props.children}</Button>
        }
    },
    excelImport: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false}><Icon type="import" />{props.children}</Button>
        }
    },
    special_pagePlistSetting: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return disabled ? <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false}>{props.children}</Button> : <Link className="ant-btn ant-btn-link" to={{
                pathname: '/home/special/pageSetting/goto_plist/page_plist_setting',
                state: {
                    url: props.linkUrl
                }
            }}>{props.children}</Link>
        }
    },
    special_pageViewSetting: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return disabled ? <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false}>{props.children}</Button> : <Link className="ant-btn ant-btn-link" to={{
                pathname: '/home/special/pageSetting/goto_plist/page_view_setting',
                state: {
                    url: props.linkUrl
                }
            }}>{props.children}</Link>
        }
    },
    special_pageRelationSetting: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
    special_pageFormSetting: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return disabled ? <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false}>{props.children}</Button> : <Link className="ant-btn ant-btn-link" to={{
                pathname: '/home/special/pageSetting/goto_plist/page_form_setting',
                state: {
                    url: props.linkUrl
                }
            }}>{props.children}</Link>
        }
    },
    special_pageQuerySetting: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
    special_pageButtonSetting: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return disabled ? <Button
                type="link"
                className={disabled ? "disabled" : ''}
                disabled={disabled ? true : false}
            >{props.children}</Button> : <Link
                className="ant-btn ant-btn-link"
                to={{
                    pathname: '/home/special/pageSetting/goto_plist/page_button_setting',
                    state: {
                        url: props.linkUrl
                    }
                }}>{props.children}</Link>
        }
    },
    special_reportHeadSetting: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
    special_reportView: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
    special_reportQuerySetting: {
        render(props) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} data={props.data}>{props.children}</Button>
        }
    },
}

export default class SelefButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: this.props.SelefButton.getIn(['saveOrUpdate', 'isSubmit']),
            isLoaded: this.props.SelefButton.getIn(['saveOrUpdate', 'isLoaded'])
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.SelefButton.get('error')) {
            this.props.dispatch(push(`/home/nomatch/${nextProps.SelefButton.get('error').status}`));
        }
        !is(this.state.SelefButton, Map(nextProps.SelefButton)) && this.setState({ isLoaded: nextProps.SelefButton.getIn(['saveOrUpdate', 'isLoaded']) })
    }

    render() {
        return (
            <span key={this.props.key}>
                {this.props.type && this.props.type !== '' && buttonType[this.props.type].render({ ...this.props, that: this })}
            </span>
        );
    }
};