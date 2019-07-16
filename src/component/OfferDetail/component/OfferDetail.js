import React, { Component } from "react";
import { Spin, Row, Col, Descriptions, Tabs, Modal } from 'antd';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Map, is } from "immutable";
import { fetchOfferDetailStart, fetchOfferTabsStart } from '../action';
import { getItem, setItem, headClassify, columnsTypeHandlers } from '../../../common/util/util';
const { TabPane } = Tabs;
export default class OfferDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: Map(this.props.location.state),
      offerData: this.props.OfferDetail
    };
    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {
    let path = getItem('offerDetail');
    !path && (path = this.state.info.get('url'));
    setItem({ offerDetail: this.state.info.get('url') });
    this.props.dispatch(fetchOfferDetailStart({ path: this.state.info.get('url'), data: { current: "1", pageSize: "20", params: {} } }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.OfferDetail.get('error')) {
      this.props.dispatch(push(`/home/nomatch/${nextProps.OfferDetail.get('error').status}`));
    }
    !is(this.state.offerData, nextProps.OfferDetail) && this.setState({ offerData: nextProps.OfferDetail });
  }

  onTabChange(key, tabData) {
    const tabItem = tabData[key].address;
    this.props.dispatch(fetchOfferTabsStart({ path: tabItem.URL, data: tabItem.param }));
  }

  componentWillUpdate() {
    const { offerData } = this.state;
    const { data } = offerData.toJS();
    const that = this;
    if (data.code && data.code === 9999) {
      Modal.error({
        title: data.message,
        content: `请先${data.message.slice(1)}`,
        onOk() {
          console.log(that.props);
          that.props.history.go(-1);
        }
      });
    };
  }

  render() {
    const { offerData } = this.state;
    const { head, data, tabs } = offerData.toJS();
    const header = headClassify(head);
    const tabData = data.nodeList;
    return (
      <Spin className="mainList" size="large" spinning={!offerData.get('isLoaded')}>
        <Row gutter={20}>
          {header.map((item, index) => <Col span={12} key={index}>
            <Descriptions bordered layout="vertical">
              {item.category.map(item => {
                const columns = columnsTypeHandlers(item);
                return (<Descriptions.Item key={item.name} label={item.label}>
                  {columns.render ? columns.render(data[item.name], item) : data[item.name]}
                </Descriptions.Item>)
              })}
            </Descriptions>
          </Col>)}
        </Row>
        <Row>
          {tabData && <Tabs defaultActiveKey="0" onChange={key => this.onTabChange(key, tabData)}>
            {tabData.map((item, index) => <TabPane tab={item.nodeName} key={index}>
              <Spin size="large" spinning={!tabs.isLoaded}>
                <Tabs tabPosition="left">
                  {tabs.spaces.map(tabItem => <TabPane tab={tabItem.spaceName} key={tabItem.spaceId}>
                    {tabItem.spaceName}
                  </TabPane>)}
                </Tabs>
              </Spin>
            </TabPane>)}
          </Tabs>}
        </Row>
      </Spin>
    );
  }
}

OfferDetail.propTypes = {
  OfferDetail: PropTypes.object.isRequired
}