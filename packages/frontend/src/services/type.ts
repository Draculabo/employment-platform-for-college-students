import { AxiosResponse } from 'axios';

export interface ResponseData<T = unknown> {
  status: number;
  data: T;
  msg?: string;
}

export function resolve<T>(promise: Promise<AxiosResponse<ResponseData<T>>>) {
  return promise.then((response) => {
    return response.data;
  });
}
export interface PaginationParams {
  order?: [any, 'ASC' | 'DESC'];
  distinct?: boolean;
  pageNo: number;
  pageSize: number;
}
