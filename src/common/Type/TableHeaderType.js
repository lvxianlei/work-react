import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import moment from 'moment';
import ImageView from '../component/ImageView';
const { Paragraph } = Typography;

/**
 * tableView表单中根据表头type选择展示方式
 * @param {*} columns 每一个columns所需要的数据
 */
export default columns => {
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
                return <ImageView url={data.url} />
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