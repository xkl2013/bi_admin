import React, { Component } from "react";
import { connect } from "dva";
import { Checkbox } from "antd";
import { routerRedux } from "dva/router";
import Login from "components/Login";
import PassWordErrorAlert from "@/components/passWordErrot/PassWordErrorAlert";
import styles from "./loginIn.less";
import { getAuthority } from "@/utils/authority";
// import { formatEmail } from '../../utils/email';

const { UserName, Submit, NoHintPwd } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects["login/login"]
}))
export default class LoginPage extends Component {
  constructor(props) {
    const localAdminUser = getAuthority("dva-admin") || {};
    super(props);
    this.state = {
      type: "account",
      autoLogin: true,
      errorMessage: "",
      isShowErrorBox: true,
      adminUser: {
        username: localAdminUser.username || "",
        password: localAdminUser.password || ""
      }
    };
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (
  //     JSON.stringify(nextProps.login.loginStatusObj) !==
  //     JSON.stringify(this.props.login.loginStatusObj)
  //   ) {
  //     this.setState({
  //       errorMessage: nextProps.login.loginStatusObj.msg,
  //       isShowErrorBox: nextProps.login.loginStatusObj.status,
  //     });
  //   }
  // }

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    if (!err) {
      const { autoLogin } = this.state;
      this.props.dispatch({
        type: "login/login",
        payload: {
          ...values,
          autoLogin
        }
      });
    }
  };

  callBackPwd = () => {
    this.props.dispatch(
      routerRedux.push({ pathname: "/changePwd/emilRetrieve" })
    );
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  render() {
    const { submitting } = this.props;
    const { type, adminUser, errorMessage, isShowErrorBox } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <div style={{ width: "340px", height: "40px" }}>
            <PassWordErrorAlert
              style={{ width: "340px" }}
              errorMes={errorMessage}
              isShow={!isShowErrorBox}
            />
          </div>
          <div style={{ width: "340px" }}>
            <span className={styles.loginLabel} style={{ marginTop: "0px" }}>
              用户名
            </span>
            <UserName name="username" placeholder="输入账号" defaultValue="" />
            <span className={styles.loginLabel}>密码</span>
            <NoHintPwd
              name="password"
              placeholder="请输入密码"
              defaultValue={adminUser.password}
            />
            <div className={styles.loginStatusBox}>
              <span style={{ float: "left" }}>
                <Checkbox
                  checked={this.state.autoLogin}
                  style={{ color: "#787878", fontSize: "12px" }}
                  onChange={this.changeAutoLogin}
                >
                  记住密码
                </Checkbox>
              </span>
              {/* <span className={styles.callBackPwd} onClick={this.callBackPwd}>
                忘记密码
              </span> */}
            </div>
            <Submit
              loading={submitting}
              type="primary"
              className={styles.searchButton}
            >
              登录
            </Submit>
          </div>
        </Login>
      </div>
    );
  }
}
