// import { stringify } from 'qs';
import request from '../utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/fakeAccountLogin', {
    method: 'POST',
    body: params,
  });
}
export async function queryCurrent(params) {
  return request('/api/currentUser', {
    method: 'POST',
    body: params,
  });
}
