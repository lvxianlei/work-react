import React, { Component } from "react";
import { Spin, Row, Col, Descriptions, message } from 'antd';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Map, is } from "immutable";
import { fetchDetailStart, fetchPopFormStart } from '../action';
import { saveOrUpdateStart, deleteReset } from '../../SelefButton/action';
import { headClassify, getItem, setItem } from '../../../common/util/util';
import { TableHeaderType } from '../../../common/Type';
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
      Detail: this.props.Detail,
      saveData: this.props.SaveData,
      visible: false,
      plistVisible: false,
      title: ""
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.savePopFormRef = this.savePopFormRef.bind(this);
    this.show = this.show.bind(this);
    this.plistCancel = this.plistCancel.bind(this);
  }

  static deleteTag;

  componentDidMount() {
    let path = this.state.info.get('url');
    if (!path) {
      const localPath = getItem('detail');
      path = localPath ? localPath : false;
    } else {
      setItem({ detail: this.state.info.get('url') })
    }
    if (path) {
      this.props.dispatch(fetchDetailStart({ path }));
    } else {
      this.props.dispatch(push(`/home/nomatch/404`));
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.Detail.getIn(['detailData', 'error'])) {
      this.props.dispatch(push(`/home/nomatch/${nextProps.Detail.getIn(['detailData', 'error']).status}`));
    }
    !is(this.state.saveData, nextProps.SaveData) && this.setState({ saveData: nextProps.SaveData });
    !is(this.state.Detail, nextProps.Detail) && this.setState({ Detail: nextProps.Detail });
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

  handleCreate(event) {
    event.preventDefault();
    const detail = this.state.Detail;
    const postData = detail.get('popForm');
    this.popFormRef.validateFields((err, values) => {
      if (err) {
        return;
      }
      for (let key in values) {
        postData.data[key] = values[key];
      }

      console.log(postData, values, is(postData, this.state.Detail.get('popForm')));
      // this.props.dispatch(saveOrUpdateStart({
      //   path: `/${formData.get('url')}/base/saveOrUpdate/${formData.get('name')}`,
      //   data: postData
      // }));
    });
  }

  componentDidUpdate() {
    const { isLoaded, deleteId } = this.state.saveData.get('delete');
    const willReceiveDetail = this.state.Detail;
    const relations = willReceiveDetail.get('relations');
    const saveData = this.props.SaveData.getIn(['saveData', 'isLoaded']);
    if (isLoaded) {
      this.deleteTag && this.deleteTag();
      message.success('数 据 成 功 删 除 ! ');
      relations.forEach(item => {
        if (item => item.name === deleteId.name) {
          item.data.list = item.data.list.filter(dataItem => {
            let filterCondition;
            dataItem.pageButton.forEach(button => {
              filterCondition = button.linkUrl !== deleteId.linkUrl;
            });
            return filterCondition;
          });
        }
      });
      this.setState({ Detail: willReceiveDetail });
      this.props.dispatch(deleteReset());
    }
    // this.setState({
    //   visible: false
    // });
  }

  savePopFormRef(formRef) {
    if (formRef + '' !== 'null') {
      this.popFormRef = formRef.props.form;
    }
  }

  render() {
    const detailData = this.state.Detail.get('detailData');
    const relations = this.state.Detail.get('relations');
    const head = headClassify(detailData.head);
    const { data, pageButton, pageRelations } = detailData;
    const formData = Map(this.state.Detail.get('popForm'));
    const { visible, plistVisible, title, isLoaded } = this.state;
    const pages = pageRelations.filter(item => item.relatePageName);
    return (
      <Spin className="mainList" size="large" spinning={!detailData.isLoaded}>
        <PopForm
          okButtonIsLoaded={isLoaded}
          wrappedComponentRef={this.savePopFormRef}
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
                const columns = TableHeaderType(item);
                return (<Descriptions.Item key={item.name} label={item.label}>
                  {columns.render ? columns.render(data[item.name], item) : data[item.name]}
                </Descriptions.Item>)
              })}
            </Descriptions>
          </Row>))}
          {pages.map(relation => {
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
                        <SelefButton deleteTag={this.deleteTag} {...item} show={this.show}>{item.name}</SelefButton>
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