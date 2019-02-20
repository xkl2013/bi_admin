// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('dva-admin') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

export function setAuthority(key = null, authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  if (!key) {
    throw new Error('传入合法的key值');
  }
  return localStorage.setItem(key, JSON.stringify(proAuthority));
}

export function removeStorge(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.warn('读取本地存储失败,请检查浏览器对存储的设置');
  }
}
