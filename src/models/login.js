import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { setAuthority, removeStorge } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { fakeAccountLogin } from '../services/api';

export default {
  namespace: 'login',

  state: {
    loginStatusObj: {
      msg: '',
      status: false,
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { username, password } = payload;
      const response = yield call(fakeAccountLogin, { username, password });
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.code === 2000) {
        yield put(routerRedux.push('/'));
      } else {
        message.error(response.msg);
      }
    },
    *logout(_, { put }) {
      removeStorge('dva-admin');
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const status = payload.code === 2000;
      if (status) {
        setAuthority('dva-admin', payload.currentAuthority);
      }
      const loginStatusObj = {
        status,
        msg: payload.msg,
      };
      return {
        ...state,
        loginStatusObj,
      };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
