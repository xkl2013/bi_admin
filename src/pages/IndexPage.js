import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './IndexPage.css';

class IndexPage extends React.Component {
  render() {
    return (
      <PageHeaderWrapper title="搜索列表" home="首页">
        <div className={styles.normal}>
          <div className={styles.welcome} />
          <Button type="primary">点击</Button>
          欢迎大家一起来做一款牛逼的产品
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default connect()(IndexPage);
