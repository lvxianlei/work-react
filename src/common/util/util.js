import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
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
 * 暂时仅供relation页面head归类,此类尽量不要扩展。
 * @param {*} head  响应数据的原head
 */
export const headClassify = head => {
    const heads = head.filter(item => item.position !== "0");
    const headTypes = head.filter(item => item.position === "1").map(item => { return { type: item.groupName } });

    return headTypes.map(item => { return { type: item.type === "" || item.type === null ? "unknown" : item.type, category: heads.filter(headItem => headItem.groupName === item.type) } });
}

// 面包屑配置
const breadcrumbNameMap = {
    '/detail': '详情',
    '/edit': '编辑',
    '/detail/edit': '编辑',
    '/detailspec': '详情',
    '/detail/offerdetail': '子项',
    '/pageSetting/goto_plist': '配置',
    '/pageSetting/goto_plist/edit': '编辑',
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