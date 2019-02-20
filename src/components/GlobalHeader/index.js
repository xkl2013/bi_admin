import { PureComponent } from 'react';
import { Icon } from 'antd';
import { Link } from 'dva/router';
import Debounce from 'lodash-decorators/debounce';
import RightContent from './RightContent';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed, handleMenuCollapse } = this.props;
    if (handleMenuCollapse) {
      handleMenuCollapse(!collapsed);
      this.triggerResizeEvent();
    }
  };

  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const { collapsed, isMobile, logo } = this.props;
    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <RightContent {...this.props} />
      </div>
    );
  }
}
