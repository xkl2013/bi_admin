import React from 'react';
import { Link } from 'dva/router';
import Exception from '@/components/Exception';

const Exception403 = () => (
  <Exception type="403" desc="无此权限" linkElement={Link} backText="返回首页" />
);

export default Exception403;
