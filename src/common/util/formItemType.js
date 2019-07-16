import React from 'react';
import { Select, Input, InputNumber, DatePicker } from 'antd';
const { Option } = Select;
/**
 * 在form数据中所有的type
 */
export default {
    type: {
        render(data) {
            return (
                <Select>{
                    data.option.map(item => (
                        <Option value={item.value} key={item.value}>{item.label}</Option>
                    ))
                }</Select>
            )
        }
    },
    string: {
        render(data) {
            return (<Input />)
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
            return (<Input />)
        }
    },
    decorationGear: {
        render() {
            return (<Input />)
        }
    },
}