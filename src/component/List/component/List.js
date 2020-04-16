import React, { Component } from "react";
import { Row, Spin } from 'antd';
import { fetchListStart, fetchListPopFormStart, fetchTableViewStart, deleteListStart, savePopFormStart } from '../action';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import moment from 'moment';
import TableView from '../../../common/component/TableView';
import SearchPane from '../../../common/component/SearchPane';
import { Map, is } from "immutable";
import { getItem } from '../../../common/util/util';
import PopForm from '../../../common/component/PopForm';
import SelefButton from '../../SelefButton';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: Map(this.props.location.state),
      list: this.props.List,
      checkBoxs: [],
      visible: false,
      title: '',
      showQuery: false,
      queryData: '',
    };
    //头部Redio组件切换
    this.selectChange = this.selectChange.bind(this);
    //获取TabView多选框选中数据
    this.getCheckBox = this.getCheckBox.bind(this);
    // TabView分页切换条数的回调
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    //TabView分页换页时的回调
    this.pageChange = this.pageChange.bind(this);
    //刷新List列表（所有刷新均不刷新头部query）
    this.goRefresh = this.goRefresh.bind(this);
    //展示PopForm弹窗(ps:设置此函数是因为要统一通过SelefButton组件处理Button)
    this.show = this.show.bind(this);
    //隐藏PopForm弹窗(设置原因同上)
    this.handleCancel = this.handleCancel.bind(this);
    //设置表单控件Ref(详情转【Ant Design】)
    this.saveFormRef = this.saveFormRef.bind(this);
    //PopForm组件数据提交
    this.handleCreate = this.handleCreate.bind(this);

    this.deleteWay = deleteListStart;
  }

  componentDidMount() {
    const state = getItem('list');
    this.props.dispatch(fetchListStart({
      path: this.state.info.get('url') ? this.state.info.get('url') : state,
      data: { current: "1", pageSize: "20", params: {} }
    }));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.List.getIn(['listData', 'error'])) {
      this.props.dispatch(push(`/home/nomatch/${nextProps.List.getIn(['listData', 'error']).status}`));
    }
    if (nextProps.List.getIn(['listData', 'isLoaded']) && !nextProps.List.getIn(['table', 'isLoaded'])) {
      this.props.dispatch(fetchTableViewStart(nextProps.List.getIn(['listData', 'queryUrl'])));
    }
    !is(this.state.list, nextProps.List) && this.setState({ list: nextProps.List });
  }

  selectChange(event) {
    console.log(event)
    // let params = {};
    // const { type, doQueryConditions } = event.target.data;
    // if (type === "INPUT") {
    //   this.setState({
    //     queryData: doQueryConditions,
    //     showQuery: true
    //   });
    // } else {
    //   doQueryConditions.forEach(item => {
    //     params[item.name] = item.value;
    //   })
    //   const data = this.state.list.getIn(['listData', 'data']);
    //   this.props.dispatch(fetchListStart({
    //     path: this.state.info.get('url'),
    //     data: {
    //       current: data.current,
    //       pageSize: data.pageSize,
    //       params,
    //       queryId: event.target.data.id
    //     },
    //     loadeQueryTag: true
    //   }));
    // }
  }

  getCheckBox(event) {
    this.setState({
      checkBoxs: event
    })
  }

  goRefresh() {
    const state = getItem('list');
    this.props.dispatch(fetchListStart({
      path: this.state.info.get('url') ? this.state.info.get('url') : state,
      data: { current: "1", pageSize: "20", params: {} },
      loadeQueryTag: true
    }));
  }

  show(event) {
    this.setState({ visible: true, title: event.name });
    this.props.dispatch(fetchListPopFormStart({ path: event.linkUrl }));
  }

  handleCancel() {
    this.setState({ visible: false });
  };

  handleCreate() {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      for (let key in values) {
        if (moment.isMoment(values[key])) {
          values[key] = values[key]._d.getTime();
        }
      }
      const list = this.state.list;
      const popForm = list.get('popForm');
      delete popForm.isLoaded;
      const { url, name } = popForm;
      const path = `/${url}/base/saveOrUpdate/${name}`;
      for (let key in values) {
        if (popForm.data[key] || popForm.data[key] + '' === 'null') {
          if (popForm.head.filter(item => item.name === key)[0].type === "ueditor") {
            popForm.data[key] = values[key].toHTML();
          } else if (popForm.head.filter(item => item.name === key)[0].type === "picture") {
            popForm.data[key] = values[key][0];
          } else {
            popForm.data[key] = values[key]
          }
        } else {
          popForm.data[key] = null
        }
      }
      this.props.dispatch(savePopFormStart({ path, data: popForm }));
      this.setState({
        visible: false
      });
    });
  }

  saveFormRef(formRef) {
    this.formRef = formRef;
  }

  onShowSizeChange(current, pageSize) {
    const state = getItem('list');
    this.props.dispatch(fetchListStart({
      path: this.state.info.get('url') ? this.state.info.get('url') : state,
      data: { current, pageSize, params: {} },
      loadeQueryTag: true
    }));
  }

  pageChange(pageNumber) {
    const { current, pageSize } = pageNumber;
    const state = getItem('list');
    this.props.dispatch(fetchListStart({
      path: this.state.info.get('url') ? this.state.info.get('url') : state,
      data: { current, pageSize, params: {} },
      loadeQueryTag: true
    }));
  }

  render() {
    const { list, checkBoxs, visible, title } = this.state;
    const { table, popForm, listData } = list.toJS();
    return (
      <div className="mainList">
        <PopForm
          wrappedComponentRef={this.saveFormRef}
          title={title} visible={visible}
          data={Map(popForm)}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        {table.isLoaded && <div>
          <Row className="pageButtons top">
            {listData.pageButton.map((item, index) => <SelefButton {...item} show={this.show} key={index}>{item.name}</SelefButton>)}
          </Row>
          <Row>
            <SearchPane onSearch={this.selectChange || {}} dataSource={table.tableData} />
          </Row>
        </div>}
        <Spin size="large" spinning={!listData.isLoaded}>
          <Row className="bottomPageButton" style={{ marginTop: 10 }}>
            {listData.bottomPageButton && listData.bottomPageButton.map(item => <SelefButton key={item.name} checkBoxs={checkBoxs} goRefresh={this.goRefresh} {...item}>{item.name}</SelefButton>)}
          </Row>
          <TableView deleteWay={this.deleteWay} {...this.props} onChange={this.pageChange} onShowSizeChange={this.onShowSizeChange} data={Map(listData)} show={this.show} getCheckBox={this.getCheckBox} selectChange={this.selectChange} />
        </Spin>
      </div>
    );
  }
}

List.propTypes = {
  List: PropTypes.object.isRequired
}