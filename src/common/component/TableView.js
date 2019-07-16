import React from 'react';
import { Table, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { columnsTypeHandlers } from '../util/util';
import Highlighter from 'react-highlight-words';
import SelefButton from '../../component/SelefButton';
let searchText = "";
let searchInput;
const handleSearch = (selectedKeys, confirm) => {
    confirm();
    searchText = selectedKeys[0];
};

const handleReset = clearFilters => {
    clearFilters();
    searchText = "";
};

const onShowSizeChange = () => {

}

function getColumnSearchProps(dataIndex, filterPorps) {
    let filter = {};
    filterPorps && filterPorps.length > 0 && (filterPorps = filterPorps.filter(item => item.type === "INPUT"));
    filterPorps.length > 0 && (filterPorps = filterPorps[0].doQueryConditions);

    filterPorps.length > 0 && filterPorps.forEach(item => {
        if (dataIndex === item.name) {
            filter = {
                filterDropdown({ setSelectedKeys, selectedKeys, confirm, clearFilters }) {
                    return (<div style={{ padding: 8 }}>
                        <Input
                            ref={node => {
                                searchInput = node;
                            }}
                            placeholder={`Search ${dataIndex}`}
                            value={selectedKeys[0]}
                            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => handleSearch(selectedKeys, confirm)}
                            style={{ width: 188, marginBottom: 8, display: 'block' }}
                        />
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm)}
                            icon="search"
                            size="small"
                            style={{ width: 90, marginRight: 8 }}
                        >
                            搜索
                      </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}>
                            重置
                      </Button>
                    </div>)
                },
                onFilter(value, record) {
                    record[dataIndex]
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase())
                },
                onFilterDropdownVisibleChange(visible) {
                    if (visible) {
                        setTimeout(() => searchInput.select());
                    }
                },
                render(text) {
                    return (<Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ""}
                    />)
                }
            }
        }
    });
    return filter;
}

function createColumns(data, filterPorps) {
    !data instanceof Array && new Error('data must a Array');
    const columns = data.map((item, index, columnsArr) => {
        if (index === columnsArr.length - 1) {
            return {
                ...getColumnSearchProps(item.name, filterPorps),
                ...columnsTypeHandlers(item)
            }
        } else if (item.position === "1" || item.position === "2") {
            return {
                width: 130,
                fixed: 'left',
                ...getColumnSearchProps(item.name, filterPorps),
                ...columnsTypeHandlers(item)
            }
        } else {
            return {
                width: 130,
                ...getColumnSearchProps(item.name, filterPorps),
                ...columnsTypeHandlers(item)
            }
        }

    });
    return columns;
}

function formatData(data, props) {
    let columns = data.head.filter(item => item.position !== "0").map(item => ({ ...item, routerName: data.name })),
        dataSource = data.data.list,
        { total, pageSize, current } = data.data,
        filterPorps = data.table ? data.table.tableData : [];
    const pagination = { showSizeChanger: true, onShowSizeChange, defaultCurrent: current, total, pageSize, current, size: "" };
    dataSource = dataSource ? dataSource.map(item => { return { key: item.id, ...item } }) : [];
    columns = createColumns(columns, filterPorps);

    columns.length > 0 && columns.push({
        title: "操作",
        dataIndex: "pageButton",
        width: 170,
        key: data.name + 'pageButton',
        fixed: 'right',
        render(tag) {
            return (<span>{
                tag && tag.map(item => (<SelefButton {...item} key={item.linkUrl} show={props.show} {...props} >{item.name}</SelefButton>))
            }</span>)
        }
    });
    return { columns, dataSource, pagination };
}

function TableView(props) {
    const tableInfo = formatData(props.data.toJS(), props);
    const pageButton = props.data.get('bottomPageButton');
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
    return (<Table className="tableView" size="middle" rowkey={props.data.get('name')}  {...tableInfo} {...props} scroll={{ x: 170 * (tableInfo.columns.length - 1) }} />)
}

TableView.propTypes = {
    data: PropTypes.object.isRequired,
    selectChange: PropTypes.func
}

export default TableView;
