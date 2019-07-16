import React, { Component } from "react";
import { Radio, Row, Col, Spin } from 'antd';
import { fetchListStart } from '../action';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import TableView from '../../../common/component/TableView';
import { Map, } from "immutable";
import IScroll from '../../../../node_modules/iscroll/build/iscroll';
import { getItem } from '../../../common/util/util';
import PopForm from '../../../common/component/PopForm';
import SelefButton from '../../SelefButton';
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: Map(this.props.location.state),
      listData: this.props.List.get('listData'),
      table: this.props.List.get('table'),
      popForm: this.props.List.get('popForm'),
      checkBoxs: [],
      visible: false,
      title: ''
    }
    this.selectChange = this.selectChange.bind(this);
    this.getCheckBox = this.getCheckBox.bind(this);
    this.goRefresh = this.goRefresh.bind(this);
    this.show = this.show.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const state = getItem('list');
    this.props.dispatch(fetchListStart({
      path: this.state.info.get('url') ? this.state.info.get('url') : state,
      data: { current: "1", pageSize: "20", params: {} }
    }));
    this.scroll = new IScroll(document.querySelector('.tableView'), {
      mouseWheel: true,
      scrollbars: true,
      scrollX: true,
      scrollY: true
    });
    this.scroll.refresh();
  }

  componentWillUpdate() {
    this.scroll.refresh();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.List.get('error')) {
      this.props.dispatch(push(`/home/nomatch/${nextProps.List.get('error').status}`));
    }
    this.setState({ listData: nextProps.List.get('listData'), table: nextProps.List.get('table') });
  }

  selectChange(event) {
    let params = {};
    const queryData = event.target.data.doQueryConditions;
    queryData.forEach(item => {
      params[item.name] = item.value;
    })
    const data = this.state.listData.data;
    this.props.dispatch(fetchListStart({
      path: this.state.info.get('url'),
      data: {
        current: data.current,
        pageSize: data.pageSize,
        params,
        queryId: event.target.data.id
      }
    }));
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
      data: { current: "1", pageSize: "20", params: {} }
    }));
  }

  show(event) {
    this.setState({ visible: true, title: event.name });
    // this.props.dispatch(fetchPopFormStart(event.linkUrl));
  }

  handleCancel() {
    this.setState({ visible: false });
  };

  handleCreate() {
    const form = this.formRef.props.form;
    const { formData } = this.state;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const postData = formData.toJS();
      for (let key in values) {
        postData.data[key] = values[key];
      }
      // this.props.dispatch(saveOrUpdateStart({
      //   path: `/${formData.get('url')}/base/saveOrUpdate/${formData.get('name')}`,
      //   data: postData
      // }));
      this.setState({
        visible: false
      });
      // this.props.dispatch(fetchListStart({ path: getItem('state'), data: { current: "1", pageSize: "20", params: {} } }));
    });
  }

  saveFormRef(formRef) {
    this.formRef = formRef;
  }


  render() {
    const { listData, table, checkBoxs, visible, title, popForm } = this.state;
    return (
      <div className="mainList">
        <PopForm
          // okButtonIsLoaded={isLoaded}
          wrappedComponentRef={this.saveFormRef}
          title={title} visible={visible}
          data={Map(popForm)}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <Spin size="large" spinning={!listData.isLoaded}>
          <Row className="pageButtons top">
            {listData.pageButton.map((item, index) => <SelefButton {...item} show={this.show} key={index}>{item.name}</SelefButton>)}
          </Row>
          <Row>
            <Col span={12}>{table && <Radio.Group onChange={this.selectChange || {}} defaultValue="默认" buttonStyle="solid" >
              {table.tableData
                .filter(item => item.type !== 'INPUT')
                .map(item => (<Radio.Button key={item.id} data={item} value={item.name}>{item.name}</Radio.Button>))
              }</Radio.Group>}</Col>
          </Row>
          <Row className="bottomPageButton" style={{ marginTop: 10 }}>
            {listData.bottomPageButton && listData.bottomPageButton.map(item => <SelefButton key={item.name} checkBoxs={checkBoxs} goRefresh={this.goRefresh} {...item}>{item.name}</SelefButton>)}
          </Row>
          <TableView {...this.props} data={Map(listData)} show={this.show} getCheckBox={this.getCheckBox} selectChange={this.selectChange} />
        </Spin>
      </div>
    );
  }
}

List.propTypes = {
  List: PropTypes.object.isRequired
}