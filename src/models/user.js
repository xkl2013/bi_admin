import { message } from 'antd';
import { queryCurrent } from '../services/api';

export default {
  namespace: 'user',

  state: {
    collapsed: false,
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);

      if (response.code !== 2000) {
        message.error(response.msg);
      }
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};
