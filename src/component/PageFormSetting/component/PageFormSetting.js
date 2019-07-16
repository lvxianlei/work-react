import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Spin, Row, List } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { push } from 'react-router-redux';
import { Map, is } from "immutable";
import { fetchPageFormSettingStart } from '../action';
import { getItem, setItem } from '../../../common/util/util';
import DragSourceBox from "./DragSourceBox";
import DropTargetBox from "./DropTargetBox";
export default class PageFormSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: Map(this.props.location.state),
      pageFormData: this.props.pageFormData,
    };
  }

  componentDidMount() {
    let path = getItem('pageFormSetting');
    !path && (path = this.state.info.get('url'));
    setItem({ pageFormSetting: this.state.info.get('url') });
    this.props.dispatch(fetchPageFormSettingStart({ path: this.state.info.get('url'), data: { current: "1", pageSize: "20", params: {} } }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pageFormData.get('error')) {
      this.props.dispatch(push(`/home/nomatch/${nextProps.pageFormData.get('error').status}`));
    }
    !is(this.state.pageFormData, nextProps.pageFormData) && this.setState({ pageFormData: nextProps.pageFormData });
  }

  render() {
    const { pageFormData } = this.state;
    const { page, fields, pages, isLoaded } = pageFormData.toJS();
    const dataSource = fields.filter(item => item.type !== "id" && item.type !== "hide");
    return (
      <Spin className="mainList" size="large" spinning={!isLoaded}>
        <DndProvider backend={HTML5Backend}>
          <Row style={{ display: "flex" }}>
            <nav style={{ width: "12%" }}>
              <List
                header={<div>页面配置选项</div>}
                dataSource={dataSource}
                grid={{ column: 1 }}
                bordered
                renderItem={(item, index) => (
                  <List.Item key={item.id} style={{ boxSizing: "border-box", padding: "10px", marginBottom: '0', paddingBottom: index === dataSource.length - 1 ? '10px' : '0' }}>
                    <DragSourceBox data={item} />
                  </List.Item>
                )} />
            </nav>
            <DropTargetBox page={Map(page)} pages={pages} />
          </Row>
        </DndProvider>
      </Spin>
    )
  }
}

PageFormSetting.propTypes = {
  pageFormData: PropTypes.object.isRequired
}
