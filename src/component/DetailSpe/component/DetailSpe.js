import React, { Component } from "react";
import { Spin, Row, Descriptions, Card, Modal, Radio } from 'antd';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Map, is } from "immutable";
import { fetchDetailSpeStart, submitChangeFlowStatusStart } from '../action';
import { headClassify, getItem, setItem } from '../../../common/util/util';
import { TableHeaderType } from '../../../common/Type';
import TableView from '../../../common/component/TableView';
import MyTextArea from './MyTextArea';
import { IconType } from '../../../common/Type'

export default class DetailSpe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: Map(this.props.location.state),
      detailSpe: this.props.DetailSpe,
      radioValue: 'init',
      showModal: false,
      message: "无"
    }
    this.clickShowModal = this.clickShowModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {
    let path = getItem('detailSpe');
    !path && (path = this.state.info.get('url'));
    setItem({ detail: this.state.info.get('url') });
    this.props.dispatch(fetchDetailSpeStart({ path: this.state.info.get('url'), data: { current: "1", pageSize: "20", params: {} } }));
  }

  shouldComponentUpdate(nextProps) {
    const { info } = this.state;
    return is(info, Map(nextProps.location.state));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.DetailSpe.get('error')) {
      this.props.dispatch(push(`/home/nomatch/${nextProps.DetailSpe.get('error').status}`));
    }
    !is(this.state.detailSpe, nextProps.DetailSpe) && this.setState({ detailSpe: nextProps.DetailSpe });
  }

  clickShowModal() {
    this.setState({ showModal: true });
  }

  handleSubmit(values, buttonTag) {
    const url = '/workflow/workflow/changeFlowStatus';
    const { detailSpe, message, radioValue } = this.state;
    if (values !== 'ok' && buttonTag !== '1') {
      this.setState({ message: values.message });
    } else if (values === 'ok') {
      // const { detailSpe, message, radioValue } = this.state;
      const postData = {
        id: detailSpe.getIn(['flowActivityInstanceUser', 'id']),
        status: '0',
        message: message,
        radio: radioValue
      }
      this.props.dispatch(submitChangeFlowStatusStart({ path: url, data: postData }));
    } else {
      const postData = {
        id: detailSpe.getIn(['flowActivityInstanceUser', 'id']),
        status: buttonTag,
        message: values.message,
        radio: radioValue
      }
      this.props.dispatch(submitChangeFlowStatusStart({ path: url, data: postData }));
    }
  }

  render() {
    const { detailSpe, showModal, radioValue } = this.state;
    const { isLoaded, data, head, flowActivityInstances, statusOption, flowInstanceLogs } = detailSpe.toJS();
    const header = headClassify(head);
    const cardHeadStyle = { backgroundColor: "#CC7040", textAlign: "center", color: "#fff" };
    const cardBodyStyle = { padding: "5px 0", height: "38px", lineHeight: "28px", textAlign: "center" }
    const noBackToInit = data.title && data.title.indexOf("财务二审") > 0;
    return (
      <Spin className="mainList" size="large" spinning={!isLoaded}>
        <Modal
          title="驳回"
          style={{ top: 20 }}
          visible={showModal}
          onOk={() => this.handleSubmit('ok')}
          onCancel={() => this.setState({ showModal: false })}>
          <Radio.Group onChange={({ target }) => this.setState({ radioValue: target.value })} defaultValue={radioValue}>
            {
              noBackToInit ? null : <Radio.Button value="init">驳回至初始节点</Radio.Button>
            }
            <Radio.Button value="previous">驳回至上一节点</Radio.Button>
          </Radio.Group>
        </Modal>
        <Row>
          {header.map((list, index) => (<Row key={index}>
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
        </Row>
        <Row>
          <Row style={{ background: '#e2e5e9', marginBottom: "10px" }}><h3>审批进度</h3></Row>
          <nav style={{ display: "flex", flexWrap: "wrap" }}>
            {flowActivityInstances.map((item, index) =>
              <div style={{ width: "150px" }} key={item.id}>
                <Card title={statusOption.filter(option => option.value === item.status)[0].label} size="small" headStyle={cardHeadStyle} bodyStyle={cardBodyStyle}>{item.title}</Card>
                {IconType.arrow}
              </div>
            )}
          </nav>
        </Row>
        <Row>
          <Row style={{ background: '#e2e5e9', marginBottom: "10px" }}><h3>审批日志</h3></Row>
          <TableView {...this.props} data={Map(flowInstanceLogs)} />
        </Row>
        <MyTextArea handleSubmit={this.handleSubmit} showModal={this.clickShowModal} />
      </Spin >
    );
  }
}

DetailSpe.propTypes = {
  DetailSpe: PropTypes.object.isRequired
}

