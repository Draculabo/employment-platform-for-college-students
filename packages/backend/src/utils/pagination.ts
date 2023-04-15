import { ConfigType } from '@/v2/dao/type';
export interface PaginationParams<T = any> {
  pageNo: number;
  pageSize?: number;
  distinct?: boolean;
  order?: [T extends Object ? string & keyof T : any, 'ASC' | 'DESC'];
}
export const paginationParse = <T = any>({ pageNo = 1, pageSize = 10, order, distinct }: Partial<PaginationParams> = {}): ConfigType<T> => {
  if (pageNo < 1 || pageNo > 9999) {
    pageNo = 1;
  }
  const result: ConfigType<T> = {
    order,
    distinct,
    limit: pageSize,
    offset: (pageNo - 1) * pageSize,
  };
  return result;
};
