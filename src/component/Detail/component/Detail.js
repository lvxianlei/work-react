import React, { Component } from "react";
import { Spin, Row, Col, Descriptions } from 'antd';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Map, is } from "immutable";
import { fetchDetailStart, fetchPopFormStart } from '../action';
import { saveOrUpdateStart } from '../../SelefButton/action';
import { fetchListStart } from '../../List/action';
import { headClassify, columnsTypeHandlers, getItem, setItem } from '../../../common/util/util';
import SelefButton from '../../SelefButton';
import TableView from '../../../common/component/TableView';
import PopForm from '../../../common/component/PopForm';
import PopPlist from '../../../common/component/PopPlist';
const initRelation = Map({
  applicationClass: '',
  isLoaded: true,
  data: {},
  head: [],
  model: '',
  name: '',
  pageButton: [],
  pageRelations: [],
  url: '',
  webJS: null,
});
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: Map(this.props.location.state),
      detailData: this.props.Detail,
      visible: false,
      plistVisible: false,
      title: "",
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.show = this.show.bind(this);
    this.plistCancel = this.plistCancel.bind(this);
  }

  componentDidMount() {
    let path = getItem('detail');
    !path && (path = this.state.info.get('url'));
    setItem({ detail: this.state.info.get('url') });
    this.props.dispatch(fetchDetailStart({ path: this.state.info.get('url'), data: { current: "1", pageSize: "20", params: {} } }));
  }

  shouldComponentUpdate(nextProps) {
    const { info } = this.state;
    return is(info, Map(nextProps.location.state));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Detail.get('error')) {
      this.props.dispatch(push(`/home/nomatch/${nextProps.Detail.get('error').status}`));
    }
    !is(this.state.detailData, nextProps.Detail) && this.setState({ detailData: nextProps.Detail });
  }

  show(event) {
    this.setState({ visible: true, title: event.name });
    this.props.dispatch(fetchPopFormStart(event.linkUrl));
  }

  handleCancel() {
    this.setState({ visible: false });
  };

  plistCancel() {
    this.setState({ plistVisible: false });
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
      this.props.dispatch(saveOrUpdateStart({
        path: `/${formData.get('url')}/base/saveOrUpdate/${formData.get('name')}`,
        data: postData
      }));
      this.setState({
        visible: false
      });
      this.props.dispatch(fetchListStart({ path: getItem('state'), data: { current: "1", pageSize: "20", params: {} } }));
    });
  }

  saveFormRef(formRef) {
    this.formRef = formRef;
  }

  render() {
    const detailData = this.state.detailData;
    const head = headClassify(detailData.get('head'));
    const data = detailData.get('data');
    const pageButton = detailData.get('pageButton');
    const pageRelations = detailData.get('pageRelations').filter(item => item.relatePageName);
    const relations = detailData.get('relations');
    const formData = Map(detailData.get('popForm'));
    const { visible, plistVisible, title, isLoaded } = this.state;
    return (
      <Spin className="mainList" size="large" spinning={!detailData.get('isLoaded')}>
        <PopForm
          okButtonIsLoaded={isLoaded}
          wrappedComponentRef={this.saveFormRef}
          title={title} visible={visible}
          data={formData}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <PopPlist
          okButtonIsLoaded={isLoaded}
          wrappedComponentRef={this.saveFormRef}
          title={title}
          visible={plistVisible}
          data={formData}
          onCancel={this.plistCancel}
          onCreate={this.handleCreate}
        />
        <div className="pageButtons">
          {pageButton.map((item, index) => <SelefButton
            {...item}
            key={index}
            show={this.show}
            {...this.props}>{item.name}</SelefButton>)}
        </div>
        <Row>
          {head.map((list, index) => (<Row key={index}>
            <Row style={{ background: '#e2e5e9' }}><h3>{list.type}</h3></Row>
            <Descriptions bordered>
              {list.category.map(item => {
                const columns = columnsTypeHandlers(item);
                return (<Descriptions.Item key={item.name} label={item.label}>
                  {columns.render ? columns.render(data[item.name], item) : data[item.name]}
                </Descriptions.Item>)
              })}
            </Descriptions>
          </Row>))}
          {pageRelations.map(relation => {
            const relationData = relations.filter(item => item.name === relation.relatePageName)[0];
            return (
              <Row
                key={relation.relatePageName}
                style={{ marginTop: 10 }}>
                <Row
                  className="pageButtons"
                  style={{ background: '#e2e5e9' }}>
                  <Col span={2}><h3>{relation.title}</h3></Col>{
                    relation.pageButton && relation.pageButton.map(item => (
                      <Col span={2} key={item.name}>
                        <SelefButton {...item} show={this.show}>{item.name}</SelefButton>
                      </Col>))
                  }</Row>
                {relations.length > 0 && <TableView
                  key={relation.relatePageName + 'table'}
                  show={this.show}
                  data={relationData ? Map(relationData) : initRelation} />}
              </Row>
            )
          })}
        </Row>
      </Spin>
    );
  }
}

Detail.propTypes = {
  Detail: PropTypes.object.isRequired
}