import React from 'react';
import { Select, Input, InputNumber, DatePicker, Cascader, Upload, Button, Icon } from 'antd';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { cascaderOptions } from '../util/cascaderOptions';
import HouseType from '../component/HouseType';
import { getItem } from '../util/util'
import { SAVE_PICTURE_URL } from '../API'
const { Option } = Select;
const { TextArea } = Input
/**
 * 在form数据中所有的type
 */
const formType = {
    type: {
        render(data) {
            return (
                <Select placeholder="请选择">{
                    data.option.map(item => (
                        <Option value={item.value} key={item.value}>{item.label}</Option>
                    ))
                }</Select>
            )
        }
    },
    string: {
        render(data) {
            return data.name === "houseTypeOfClue" ? (<HouseType />) : (<Input />);
        }
    },
    plist: {
        render(data) {
            return (<Input />)
        }
    },
    number: {
        render(data) {
            return (<InputNumber />)
        }
    },
    date: {
        render(data) {
            return (<DatePicker />)
        }
    },
    areaLinkage: {
        render() {
            return (<Cascader placeholder="请选择" options={cascaderOptions} />)
        }
    },
    decorationGear: {
        render() {
            return (<Input />)
        }
    },
    checkbox: {
        render(data) {
            return (<Select mode="multiple" placeholder="请选择">{
                data.option.map(item => (
                    <Option value={item.value} key={item.value}>{item.label}</Option>
                ))
            }</Select>)
        }
    },
    picture: {
        render(data) {
            return (<Upload accept={'.jpg, .jpeg, .png'} action={SAVE_PICTURE_URL} data={file => {
                return ({ access_token: getItem('access_token'), data: file.name, bucket: 'test' })
            }}>
                <Button type='ghost'>
                    <Icon type="upload" /> 上传
                </Button>
            </Upload>)
        }
    },
    ueditor: {
        render(data) {
            return (<BraftEditor placeholder="请输入正文内容" />)
        }
    },
    text: {
        render(data) {
            return (<TextArea />)
        }
    },
    "": {
        render(data) {
            return (<Input />)
        }
    }
}

/**
 * 在form数据中根据type类型返回不同的展示组件
 * @param {*} formItemData  同columnsTypeHandlers的columns
 */
export default formItemData => formType[formItemData.type] ? formType[formItemData.type].render(formItemData) : <Input />;

