import axios, { AxiosRequestConfig } from 'axios';
import queryString, { StringifiableRecord } from 'query-string';
import { errorMessage } from '@/common/message';
import { getLocalStorage } from '@/common/hooks/useLcoalStorage';
import { isNil } from 'lodash';
const service = axios.create({
  baseURL: (import.meta.env.VITE_BASE_URL + '/v2') as string,
  timeout: 100000,
  // withCredentials: true,
});
// 请求拦截 统一配置
service.interceptors.request.use(
  (config) => {
    // showLoading()
    if (config.url === '/fileUpload/upload') {
      config.headers.setContentType('multipart/form-data', false);
    }
    const token = getLocalStorage('TOKEN');
    if (!isNil(token)) {
      config.headers.setAuthorization(`Bearer ${token as string}`);
    }
    return config;
  },
  (err) => {
    // hideLoading()
    errorMessage(err);
    return Promise.reject(new Error(err));
  }
);
// 统一在此处解构一层data
service.interceptors.response.use(
  (data) => {
    return data;
  },
  (err) => {
    // hideLoading()
    errorMessage(err);
    return Promise.reject(new Error(err));
  }
);

// get method
export function get<R, D = any>(url: string, options?: AxiosRequestConfig<D>) {
  return service.get<R>(url, options);
  // return new Promise((resolved, rejected) => {
  //   service
  //     .get<T>(url, options)
  //     .then(
  //       (resp) => {
  //         resolved(resp);
  //       },
  //       (err) => {
  //         errorMessage(Tip.NETWORK_ERROR);
  //         rejected(err);
  //       }
  //     )
  //     .catch((err) => {
  //       // 弹出错误提示
  //       rejected(err);
  //       errorMessage(Tip.NETWORK_ERROR);
  //     });
  // });
}
// post method
export function post<T, D = any>(url: string, data: D, options?: AxiosRequestConfig<D>) {
  return service.post<T>(url, data, options);
  // return new Promise((resolved, rejected) => {
  //   service
  //     .post<T >(url, data )
  //     .then(
  //       (resp) => {
  //         resolved(resp);
  //       },
  //       (err) => {
  //         errorMessage(Tip.NETWORK_ERROR);
  //         rejected(err);
  //       }
  //     )
  //     .catch((err) => {
  //       // 弹出错误提示
  //       errorMessage(Tip.NETWORK_ERROR);
  //       rejected(err);
  //     });
  // });
}
