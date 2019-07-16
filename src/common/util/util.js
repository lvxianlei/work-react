import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Typography, Input, Breadcrumb } from 'antd';
import formType from './formItemType';
const { Paragraph } = Typography;
export const setItem = data => {
    for (let key in data) {
        localStorage.setItem(key, data[key]);
    }
}

export const getItem = (key, format) => {
    let value = localStorage.getItem(key);
    value = (format && format instanceof Function && format(value)) || value;
    return value;
}

export const removeItem = key => localStorage.removeItem(key);


/**
 * 根据url来判断所要加载的组件
 * @param {*} path url路径
 */
export const chooseRouter = (path, pageName) => path.indexOf("/base/plist") !== -1 ? '/home/' + pageName : '/home/special/' + pageName;

/**
 * tableView表单中根据表头type选择展示方式
 * @param {*} columns 每一个columns所需要的数据
 */
export function columnsTypeHandlers(columns) {
    const string = {
        title: columns.label,
        dataIndex: columns.name,
        key: columns.name + columns.position
    };
    const columnsType = {
        string: { ...string },
        date: {
            ...string,
            render(date) {
                return date === null || date === '' ? '' : moment(date).format(columns.dateFormat)
            }
        },
        isLink: {
            ...string,
            render(data, column) {
                const { pageName, routerName, keyField, service } = columns;
                let option;
                //此处用了switch，勿删！（ps:可能后期要扩展....）
                switch (pageName) {
                    case "flowActivityInstanceUserTodoView":
                        option = {
                            pathname: `/home/${routerName}/detailspec`,
                            state: {
                                url: `/${service}/workflow/flowActivityView/${column[keyField]}`
                            }
                        };
                        break;
                    case "flowInstanceView":
                        option = {
                            pathname: `/home/${routerName}/detailspec`,
                            state: {
                                url: `/${service}/workflow/flowInstanceView/${column[keyField]}`
                            }
                        };
                        break;
                    default:
                        option = {
                            pathname: `/home/${routerName}/detail`,
                            state: {
                                url: `/${service}/base/find/view/${pageName}/${column[keyField]}`
                            }
                        };
                }
                return (<Link to={option}>{data}</Link>)
            }
        },
        type: {
            ...string,
            render(data) {
                const values = columns.option.filter(item => item.value === data);
                return values.length > 0 ? values[0].label : "";
            }
        },
        gather: {
            ...string,
            render(data) {
                return <Paragraph ellipsis={{ rows: 2, expandable: true }}>{data[0] ? data[0].value : ''}</Paragraph>;
            }
        },
        customized: {
            ...string,
            render(data) {
                return <span>{data instanceof Object ? data[0].value : data}</span>;
            }
        },
        number: {
            ...string
        },
        serial: {
            ...string
        },
        text: {
            ...string,
            render(data) {
                return <Paragraph ellipsis={{ rows: 3, expandable: true }}>{data}</Paragraph>;
            }
        },
        gatherPicture: {
            ...string,
            render(data) {
                return <span>{data.map(item => <img alt='' style={{ height: '30px' }} key={item.viewUrl} src={item.value} />)}</span>
            }
        },
        picture: {
            ...string,
            render(data) {
                return (<span><img src={data.url} style={{ height: '30px' }} alt='' /></span>)
            }
        },
        child: {
            ...string,
            render(data) {
                const { routerName } = columns;
                const option = {
                    pathname: `/home/${routerName}/detail`,
                    state: {
                        url: data.url
                    }
                };
                return (<Link to={option}>{data.title}</Link>)
            }
        },
        checkbox: {
            ...string,
            render(data) {
                const values = columns.option.filter(item => item.value === data);
                return values.length > 0 ? values[0].label : "";
            }
        }
    };
    return columns.isLink && columns.isLink !== null && columns.isLink !== "0" ? columnsType.isLink : columnsType[columns.type] ? columnsType[columns.type] : { ...string };
}

/**
 * 暂时仅供relation页面head归类,此类尽量不要扩展。
 * @param {*} head  响应数据的原head
 */
export const headClassify = head => {
    const heads = head.filter(item => item.position !== "0");
    const headTypes = head.filter(item => item.position === "1").map(item => { return { type: item.groupName } });

    return headTypes.map(item => { return { type: item.type === "" || item.type === null ? "unknown" : item.type, category: heads.filter(headItem => headItem.groupName === item.type) } });
}

/**
 * 在form数据中根据type类型返回不同的展示组件
 * @param {*} formItemData  同columnsTypeHandlers的columns
 */
export const formItemType = formItemData => formType[formItemData.type] ? formType[formItemData.type].render(formItemData) : <Input />;


// 面包屑配置
const breadcrumbNameMap = {
    '/detail': '详情',
    '/edit': '编辑',
    '/detail/edit': '编辑',
    '/detailspec': '详情',
    '/detail/offerdetail': '子项',
    '/pageSetting/goto_plist':'配置',
    '/pageSetting/goto_plist/edit':'编辑',
};

/**
 * 根据history来确定面包屑
 * 面包屑处理封装
 */
export const execRoute = location => {
    const pathSnippets = location.pathname.split('/').filter(i => i);
    return pathSnippets.slice(2).map((_, index) => {
        const url = `/${pathSnippets.slice(2, index + 3).join('/')}`;
        const path = `/${pathSnippets.slice(0, 2).join('/')}${url}`;
        return breadcrumbNameMap[url] ? (
            <Breadcrumb.Item key={url}>
                <Link to={path}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        ) : '';
    });
}