import React from 'react';
import { Link } from 'dva/router';
import Exception from '@/components/Exception';

const Exception500 = () => (
  <Exception type="500" desc="服务器异常" linkElement={Link} backText="返回首页" />
);

export default Exception500;
