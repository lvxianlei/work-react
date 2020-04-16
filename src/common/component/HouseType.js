import React, { Component } from 'react';
import { InputNumber } from 'antd';
export default class HouseType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            s: 0,
            t: 0,
            c: 0,
            w: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.setState(this.formatValue(this.props.value));
    }

    formatValue(value) {
        if (value && value + '' !== 'null') {
            const values = value.split('');
            return { s: values[0], t: values[2], c: values[4], w: values[6] };
        } else {
            return { s: 0, t: 0, c: 0, w: 0 };
        }
    }

    handleChange(value, tag) {
        const data = this.state;
        data[tag] = value;
        const { s, t, c, w } = data;
        this.setState({ tag: value });
        this.props.onChange(`${s}室${t}厅${c}厨${w}卫`);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState(this.formatValue(nextProps.value));
    }

    render() {
        const { s, t, c, w } = this.state;
        return (<div className="input-group">
            <InputNumber style={{ width: '20%' }} onChange={value => this.handleChange(value, 's')} value={s} /><span>室</span>
            <InputNumber style={{ width: '20%' }} onChange={value => this.handleChange(value, 't')} value={t} /><span>厅</span>
            <InputNumber style={{ width: '20%' }} onChange={value => this.handleChange(value, 'c')} value={c} /><span>厨</span>
            <InputNumber style={{ width: '20%' }} onChange={value => this.handleChange(value, 'w')} value={w} /><span>卫</span>
        </div>)
    }
}