import React from "react";
import { connect } from "dva";
import { Layout } from "antd";
import Media from "react-media"; // 根据query匹配render相应的组件;https://www.npmjs.com/package/react-media
import DocumentTitle from "react-document-title"; // https://www.npmjs.com/package/react-document-title
import { ContainerQuery } from "react-container-query"; // https://github.com/d6u/react-container-query
import classNames from "classnames";
import pathToRegexp from "path-to-regexp";
import memoizeOne from "memoize-one";
import isEqual from "lodash/isEqual";
import Context from "./MenuContext";
import SiderMenu from "@/components/SiderMenu";
import RouteDistribute from "@/components/RouteDistribute";
import Header from "./Header";
import Footer from "./Footer";

const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200,
    maxWidth: 1599
  },
  "screen-xxl": {
    minWidth: 1600
  }
};

class BaseIcLayout extends React.Component {
  constructor(props) {
    super(props);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  componentDidMount() {
    const { dispatch, routerData } = this.props;
    const menuData = routerData["/"];
    dispatch({
      type: "user/fetchCurrent"
    });
    dispatch({
      type: "setting/getSetting"
    });
    dispatch({
      type: "menu/getMenuData",
      payload: { routes: menuData.children }
    });
  }

  componentDidUpdate() {
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
  }

  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const { menuData } = this.props;
    const flattenMenuData = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          flattenMenuData(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    flattenMenuData(menuData);
    return routerMap;
  }

  getContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData
    };
  }

  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };

  getPageTitle = () => {
    return "dva-admin"; //  可根据路由配置显示特定name
    // const currRouterData = this.matchParamsPath(pathname);
    // if (!currRouterData) {
    //   return 'dva-admin';
    // }
    // const pageName = formatMessage({
    //   id: currRouterData.locale || currRouterData.name,
    //   defaultMessage: currRouterData.name,
    // });
    // return `${pathname}`;
  };

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed } = this.props;
    if (fixSiderbar && !isMobile) {
      return {
        paddingLeft: collapsed ? "80px" : "256px"
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      margin: "24px 24px 0",
      paddingTop: fixedHeader ? 64 : 0,
      background: "#fff"
    };
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: "global/changeLayoutCollapsed",
      payload: collapsed
    });
  };

  renderLayout = () => {
    const { navTheme, isMobile, menuData = [] } = this.props;
    return (
      <Layout>
        <SiderMenu
          logo={"../assets/logo.png"}
          theme={navTheme}
          onCollapse={this.handleMenuCollapse}
          menuData={menuData}
          isMobile={isMobile}
          {...this.props}
        />
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: "100vh"
          }}
        >
          <Header
            isMobile={isMobile}
            logo={"../assets/logo.png"}
            handleMenuCollapse={this.handleMenuCollapse}
            {...this.props}
          />
          <Layout.Content style={this.getContentStyle()}>
            <RouteDistribute {...this.props} rootPath="/" />
          </Layout.Content>
          <Layout.Footer style={{ textAlign: "center" }}>
            <Footer {...this.props} />
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  };

  render() {
    const layout = this.renderLayout();
    const {
      location: { pathname }
    } = this.props;
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)} />
        <ContainerQuery query={query}>
          {params => (
            <Context.Provider value={this.getContext()}>
              <div className={classNames(params)}>{layout}</div>
            </Context.Provider>
          )}
        </ContainerQuery>
        {/* <React.Suspense fallback></React.Suspense> */}
      </React.Fragment>
    );
  }
}
export default connect(({ loading, setting, global, menu, user }) => ({
  user,
  loading,
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menu.menuData,
  ...setting
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BaseIcLayout {...props} isMobile={isMobile} />}
  </Media>
));
