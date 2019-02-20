import React, { PureComponent } from "react";
import classNames from "classnames";
import { Dropdown, Avatar, Spin, Menu, Icon } from "antd";
import styles from "./index.less";

class RightContent extends PureComponent {
  menu = onMenuClick => (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="userCenter">
        <Icon type="user" />
        <span>用户中心</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        <span>退出</span>
      </Menu.Item>
    </Menu>
  );

  render() {
    const { currentUser, onMenuClick, navTheme } = this.props;
    const className =
      navTheme === "dark"
        ? classNames(styles.right, styles.dark)
        : styles.right;
    return (
      <div className={className}>
        {currentUser.name ? (
          <Dropdown overlay={this.menu(onMenuClick)}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}
export default RightContent;
