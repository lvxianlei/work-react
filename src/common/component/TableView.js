import React from 'react';
import { Table, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { TableHeaderType } from '../Type';
import SelefButton from '../../component/SelefButton';

function createColumns(data) {
    !data instanceof Array && new Error('data must a Array');
    const columns = data.map((item, index, columnsArr) => {
        if (index === columnsArr.length - 1) {
            return {
                ...TableHeaderType(item)
            }
        } else if (item.position === "1" || item.position === "2") {
            return {
                width: 130,
                fixed: 'left',
                ...TableHeaderType(item)
            }
        } else {
            return {
                width: 130,
                ...TableHeaderType(item)
            }
        }

    });
    return columns;
}

function formatData(data, props) {
    let columns = data.head.filter(item => item.position !== "0").map(item => ({ ...item, routerName: data.name })),
        dataSource = data.data.list ? data.data.list.slice(0, data.data.pageSize) : data.data.list,
        { total, pageSize, current } = data.data;
    const pagination = { showSizeChanger: true, onShowSizeChange: props.onShowSizeChange, defaultCurrent: current, total, pageSize, size: "" };
    dataSource = dataSource ? dataSource.map(item => { return { key: item.id || item.model, ...item } }) : [];
    columns = createColumns(columns);
    columns.length > 0 && columns.push({
        title: "操作",
        dataIndex: "pageButton",
        width: 170,
        key: data.name + 'pageButton',
        fixed: 'right',
        render(tag) {
            return (<span>{
                tag && tag.map(item => (<SelefButton {...item} key={item.linkUrl} {...props} >{item.name}</SelefButton>))
            }</span>)
        }
    });
    return { columns, dataSource, pagination };
}

function TableView(props) {
    const tableInfo = formatData(props.data.toJS(), props);
    const pageButton = props.data.get('bottomPageButton');
    const { pageSize, list } = props.data.get('data');
    const footData = list ? (pageSize ? list.slice(pageSize) : []) : [];
    const footer = () => (<Row>
        {footData.map((item, index) => {
            const { pageButton, chanceSerial, contractType } = item;
            return (<Row key={index}>
                <Col span={8}>{pageButton && pageButton[0].name}</Col>
                <Col span={8}>{chanceSerial && chanceSerial}</Col>
                <Col span={8}>{contractType && contractType}</Col>
            </Row>)
        })}
    </Row>)
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            props.getCheckBox(selectedRowKeys)
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };
    pageButton && pageButton.length > 0 && (tableInfo.rowSelection = rowSelection);
    return (<Table className="tableView" footer={footer} size="middle" rowkey={props.data.get('name') + props.data.getIn(['data', 'current'])}  {...tableInfo} {...props} scroll={{ x: 170 * (tableInfo.columns.length - 1), y: 600 }} />)
}

TableView.propTypes = {
    data: PropTypes.object.isRequired,
    selectChange: PropTypes.func,
    onShowSizeChange: PropTypes.func,
}

export default TableView;
