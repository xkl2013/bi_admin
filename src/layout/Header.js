import { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import GlobalHeader from '@/components/GlobalHeader';
import styles from './styles/header.less';

const { Header } = Layout;

class SelfHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  render() {
    const { setting } = this.props;
    const { fixedHeader } = setting;
    const width = this.getHeadWidth();
    return (
      <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
        <GlobalHeader {...setting} {...this.props} onMenuClick={this.onMenuClick} />
      </Header>
    );
  }
}
export default connect(({ loading, setting, global, user, login }) => ({
  loading,
  setting,
  login,
  currentUser: user.currentUser,
  collapsed: global.collapsed,
}))(SelfHeader);
