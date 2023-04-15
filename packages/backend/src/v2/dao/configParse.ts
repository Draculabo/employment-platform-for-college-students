import { Content } from '@/model/common';
import { SelectQueryBuilder } from 'typeorm';
import { PaginationParams } from '@/utils/pagination';
import { isNil } from 'lodash';

export const composeConfigCompose = <T extends Content>(sql: SelectQueryBuilder<T>, config?: PaginationParams<T>, alias?: string) => {
  if (isNil(config)) {
    return sql;
  }
  const { pageNo, pageSize = 10, order, distinct } = config;
  const skipNum = (pageNo - 1) * pageSize;
  const result = sql.distinct(distinct).skip(skipNum).take(pageSize);
  if (isNil(order)) {
    return result;
  }
  const mapOrder = (alias ? `${alias}.${order.at(0)}` : order.at(1)) as typeof order[0];
  return result.orderBy(...([mapOrder, order[1]] as const));
};
