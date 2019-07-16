import React, { Component } from "react";
import { Menu, Layout, Icon, Breadcrumb, Badge, Row, Col, Avatar, Dropdown } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import List from '../../../component/List';
import ContractReportPage from '../../../component/ContractReportPage';
import Detail from '../../../component/Detail';
import DetailSpe from '../../../component/DetailSpe';
import Edit from '../../../component/Edit';
import OfferDetail from '../../../component/OfferDetail';
import PageFormSetting from '../../../component/PageFormSetting';
import { setItem, getItem, chooseRouter, execRoute } from '../../../../src/common/util/util';
import logo from '../../../../src/public/logo.png'
import { fetchMainStart } from '../action';
import PropTypes from 'prop-types';
import IScroll from '../../../../node_modules/iscroll/build/iscroll';
import NoMatch from '../../NoMatch';
import { iconType } from '../../../../src/common/util/iconType';
const SubMenu = Menu.SubMenu;
const { Header, Sider, Content } = Layout;
const rootSubmenuKeys = [];
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: ['m0001', 'm00'],
      mainData: this.props.Main.toJS(),
      collapsed: false,
      defaultSelectedKey: ['m000101'],
      defaultListPath: { url: '', pageName: '' },
      routes: [],
      title: null,
    }
    this.onOpenChange = this.onOpenChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    let openKeys = getItem("openKeys");
    if (openKeys !== null && openKeys !== "") {
      openKeys = openKeys.split(',');
      const defaultSelectedKey = [openKeys.shift()];
      this.setState({
        openKeys: openKeys,
        defaultSelectedKey
      });
    }
  }

  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  componentDidMount() {
    this.props.dispatch(fetchMainStart(null));
    this.scroll = new IScroll(document.querySelector('.mainSlide'), {
      mouseWheel: true
    });
    this.scroll.refresh();
  }

  componentDidUpdate() {
    this.scroll.refresh();
  }

  addSubmenuKeys(mainData) {
    mainData.forEach(item => {
      rootSubmenuKeys.push(item.id);
    })
  }

  getDefaultListPath(data) {
    const { openKeys, defaultSelectedKey } = this.state;
    let state;
    data.forEach(item => {
      item.id === openKeys[openKeys.length - 1] && item.childJmenu.forEach(subItem => {
        subItem.id === openKeys[openKeys.length - 2] && subItem.childJmenu.forEach(child => {
          child.id === defaultSelectedKey[0] && (state = { url: child.url, pageName: child.pageName, title: child.name, routes: this.breadcrumb(defaultSelectedKey.concat(openKeys.slice(-2)), data) })
        })
      })
    });
    return state
  }

  componentWillReceiveProps(nextProps) {
    const { openKeys, defaultSelectedKey } = this.state;
    if (nextProps.Main.toJS().length > 0) {
      this.addSubmenuKeys(nextProps.Main.toJS());
      const routes = getItem('openKeys') ? this.breadcrumb(getItem('openKeys').split(','), nextProps.Main.toJS()) : this.breadcrumb(defaultSelectedKey.concat(openKeys), nextProps.Main.toJS());
      this.setState({
        mainData: nextProps.Main.toJS(),
        title: routes.length > 1 ? routes[routes.length - 1].name : '',
        routes
      }, () => {
        if (this.props.location.pathname === '/home') {
          const state = this.getDefaultListPath(this.state.mainData);
          const pathname = chooseRouter(state.url, state.pageName);
          setItem({ list: state.url });
          this.props.dispatch(push({
            pathname,
            state: {
              url: state.url
            }
          }));
        }
      });
    }
  }

  breadcrumb(keyPath, mainData) {
    const three = mainData.filter(item => item.id === keyPath[keyPath.length - 1]).shift();
    const two = three.childJmenu.filter(item => item.id === keyPath[1]).shift();
    const one = two.childJmenu.filter(item => item.id === keyPath[0]).shift();
    return [{ name: three.name }, { name: two.name }, { name: one.name, url: one.url, pageName: one.pageName }];
  }

  handleClick(e) {
    const props = e.item.props;
    setItem({ openKeys: e.keyPath, list: props.path.url });
    const routes = this.breadcrumb(e.keyPath, this.state.mainData);
    const path = chooseRouter(props.path.url, props.path.pageName);
    this.setState({
      title: props.children,
      routes
    });
    this.props.dispatch(push({
      pathname: path,
      state: {
        url: props.path.url
      }
    }));
  }

  render() {
    const { mainData, openKeys, defaultSelectedKey, routes, title } = this.state;
    const userCenter = mainData.slice(mainData.length - 1)[0];
    const userCenterDropdown = (<Menu>
      {userCenter && userCenter.childJmenu[0].childJmenu.map(item => <Menu.Item key={item.name}><Link to={
        item.pageName === "pwd" ? { pathname: `/home/special/pwd`, state: { url: item.url } } : { pathname: `/home/${item.pageName}/detail`, state: { url: item.url } }
      }>{iconType[item.id]}{item.name}</Link></Menu.Item>)}
      <Menu.Item><div><Icon type="logout" />退出登录</div></Menu.Item>
    </Menu>);
    return (
      <Layout className="main">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}
          style={{
            height: '100%',
            left: 0
          }}
          theme="light"
        >
          <h1 className="logo"><img src={logo} alt="logo" /></h1>
          <div className="mainSlide">
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={this.onOpenChange}
              defaultSelectedKeys={defaultSelectedKey}
              defaultOpenKeys={openKeys}
              onClick={this.handleClick}
            >
              {mainData.map(item => (<SubMenu key={item.id} title={<span>{iconType[item.id]}<span>{item.name}</span></span>}>
                {item.childJmenu && item.childJmenu.map(item => (<SubMenu key={item.id} title={<span>{item.name}</span>}>
                  {item.childJmenu && item.childJmenu.map(item => (<Menu.Item path={{ url: item.url, pageName: item.pageName }} key={item.id}>{item.name}</Menu.Item>))}
                </SubMenu>))}
              </SubMenu>))}
            </Menu>
          </div>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row type="flex" justify="space-between">
              <Col span={3}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Col>
              {userCenter && <Col span={3}>
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <div style={{ lineHeight: "76px" }}><Badge count={5}><Icon type="sound" style={{ fontSize: "24px" }} /></Badge></div>
                  <div style={{ marginLeft: "25px", lineHeight: "55px" }}>
                    <Dropdown overlay={userCenterDropdown}><div><Avatar icon="user"></Avatar><span className="username">{getItem("username")}</span></div></Dropdown>
                  </div>
                </div>
              </Col>}
            </Row>
          </Header>
          <Content className="content" style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 'auto' }}>
            <nav className="pageHeader">
              {<Breadcrumb separator=">">
                {routes.map((item, index) => <Breadcrumb.Item key={index}>{item.url ? <Link to={{
                  pathname: chooseRouter(item.url, item.pageName),
                  state: {
                    url: item.url
                  }
                }}>{item.name}</Link> : item.name}</Breadcrumb.Item>).concat(execRoute(this.props.location))}
              </Breadcrumb>}
              <h3 className="title">{title}</h3>
            </nav>
            <Switch>
              <Route exact path="/home/:name" component={List} />
              <Route exact path="/home/special/channelDeptReportPage" component={ContractReportPage} />
              <Route exact path="/home/special/myUserInfo" component={Detail} />
              <Route exact path="/home/special/pageSetting" component={List} />
              <Route exact path="/home/special/pwd" component={Edit} />
              <Route exact path="/home/:name/detail" component={Detail} />
              <Route exact path="/home/:name/detailspec" component={DetailSpe} />
              <Route exact path="/home/:name/edit" component={Edit} />
              <Route exact path="/home/:name/detail/edit" component={Edit} />
              <Route exact path="/home/:name/:page/goto_plist" component={List} />
              <Route exact path="/home/:name/:page/goto_plist/page_form_setting" component={PageFormSetting} />
              <Route exact path="/home/:name/:page/goto_plist/page_plist_setting" component={PageFormSetting} />
              <Route exact path="/home/:name/:page/goto_plist/page_view_setting" component={PageFormSetting} />
              <Route exact path="/home/:name/:page/goto_plist/edit" component={Edit} />
              <Route exact path="/home/:name/detail/offerdetail" component={OfferDetail} />
              <Route exact path="/home/:name/detail/detail" component={ContractReportPage} />
              <Route exact path="/home/nomatch/:status" component={NoMatch} />
              <Route component={NoMatch} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

Main.propTypes = {
  Main: PropTypes.object.isRequired
}