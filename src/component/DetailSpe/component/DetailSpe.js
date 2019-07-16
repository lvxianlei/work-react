import React, { Component } from "react";
import { Spin, Row, Descriptions, Card, Input } from 'antd';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Map, is } from "immutable";
import { fetchDetailSpeStart } from '../action';
import { headClassify, columnsTypeHandlers, getItem, setItem } from '../../../common/util/util';
import TableView from '../../../common/component/TableView';
import { iconType } from '../../../common/util/iconType'
const { TextArea } = Input;
export default class DetailSpe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: Map(this.props.location.state),
      detailSpe: this.props.DetailSpe,
    }
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.DetailSpe.get('error')) {
      this.props.dispatch(push(`/home/nomatch/${nextProps.DetailSpe.get('error').status}`));
    }
    !is(this.state.detailSpe, nextProps.DetailSpe) && this.setState({ detailSpe: nextProps.DetailSpe });
  }

  render() {
    const { detailSpe } = this.state;
    const { isLoaded, data, head, flowActivityInstances, statusOption, flowInstanceLogs } = detailSpe.toJS();
    const header = headClassify(head);
    const cardHeadStyle = { backgroundColor: "#CC7040", textAlign: "center", color: "#fff" };
    const cardBodyStyle = { padding: "5px 0", height: "38px", lineHeight: "28px", textAlign: "center" }
    return (
      <Spin className="mainList" size="large" spinning={!isLoaded}>
        <Row>
          {header.map((list, index) => (<Row key={index}>
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
        </Row>
        <Row>
          <Row style={{ background: '#e2e5e9', marginBottom: "10px" }}><h3>审批进度</h3></Row>
          <nav style={{ display: "flex", flexWrap: "wrap" }}>
            {flowActivityInstances.map((item, index) =>
              <div style={{ width: "150px" }} key={item.id}>
                <Card title={statusOption.filter(option => option.value === item.status)[0].label} size="small" headStyle={cardHeadStyle} bodyStyle={cardBodyStyle}>{item.title}</Card>
                {iconType.arrow}
              </div>
            )}
          </nav>
        </Row>
        <Row>
          <Row style={{ background: '#e2e5e9', marginBottom: "10px" }}><h3>审批日志</h3></Row>
          <TableView {...this.props} data={Map(flowInstanceLogs)} />
        </Row>
        <Row>
          <Row style={{ background: '#e2e5e9', marginBottom: "10px" }}><h3>审批意见</h3></Row>
          <TextArea rows={4} placeholder="请填写审批意见" />
        </Row>
      </Spin>
    );
  }
}

DetailSpe.propTypes = {
  DetailSpe: PropTypes.object.isRequired
}