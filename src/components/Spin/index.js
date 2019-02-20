import { Spin } from 'antd';
import classNames from 'classnames';
import styles from './index.css';

const RenderSpin = props => {
  let { className = '' } = props;
  className = classNames(styles.globalSpin, className);
  return <Spin {...props} className={className} />;
};
export default RenderSpin;
