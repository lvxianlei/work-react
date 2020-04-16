import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Select, Radio } from 'antd';
import { CardType } from '../Type';

const Option = Select.Option;
export default function CardForm(props) {
    const { showForm, pages, data } = props;
    const { label, name, type, isLink, pageName, disabled } = data;
    const [showInput, setShowInput] = useState(isLink === null || isLink === "0" || !isLink ? true : false);
    const handleRadioChange = event => {
        const showInput = event.target.value === "0" ? true : false;
        data.isLink = showInput
        setShowInput(showInput);
    };
    return <section className="cardForm">
        <p className="title"><span>{label}</span><span>{name}</span></p>
        <p className="itemType">{CardType[type] || ""}</p>
        <div className="chooseOption" style={{ display: showForm ? "block" : "none" }}>
            <div className="card_link"><span>是否为超链接</span><Radio.Group disabled={disabled} defaultValue={isLink === null || !isLink ? "0" : isLink} onChange={handleRadioChange}><Radio value={"1"}>是</Radio><Radio value={"0"}>否</Radio></Radio.Group></div>
            <div className="card_link card_input" ><span>详情:</span><Select
                size="small"
                style={{ width: '80%' }}
                defaultValue={pageName}
                disabled={showInput}
            >
                {pages.map(item => <Option key={item.label} value={item.value}>{item.label}</Option>)}
            </Select></div>
        </div>
    </section>
}

CardForm.propTypes = {
    data: PropTypes.object.isRequired,
    showForm: PropTypes.bool
}
