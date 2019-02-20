import React from 'react';
import RouteDistribute from '@/components/RouteDistribute';
import DocumentTitle from 'react-document-title';
import styles from './styles/userLayout.less';
import logoImg from '../assets/bg_logo.png';

export default class UserLayout extends React.Component {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '小德';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 小德`;
    }
    return title;
  }

  render() {
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.background}>
              <div className={styles.showContent}>
                <img src={logoImg} alt="小德logo" className={styles.logoImg} />
                <div className={styles.loginContainer}>
                  <div className={styles.loginContent}>
                    <span className={styles.header}>登录dva-admin后台管理系统</span>
                    <div className={styles.login}>
                      <RouteDistribute {...this.props} rootPath="/user" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.wordContent}>
              <span className={styles.wordBottom}>帅哥出品</span>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
