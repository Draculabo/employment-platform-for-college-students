import { Content } from '@/model/common';
import { get, isNil } from 'lodash';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import crypto from 'crypto';

/**
 *  组合where条件
 * @param data  数据
 * @param targetList  需要被组合的键
 * @param sql sql builder
 * @param alias 表别名
 */
export const composeWhereClause = <T extends Content>(
  data: Record<string, unknown>,
  targetList: (keyof T & string)[],
  sql: SelectQueryBuilder<T>,
  alias?: string
) => {
  const result = targetList.reduce((prev, cur) => {
    const value = get(data, [`${cur}`]);
    if (!isNil(value)) {
      let prefix = alias ? alias : sql.alias ? sql.alias : undefined;
      if (!isNil(prefix)) {
        prefix += '.';
      }
      prev.andWhere(`${prefix}${cur} = ${value}`);
    }
    return prev;
  }, sql);
  return result;
};

export const cryptoMD5 = (input: string) => {
  return crypto.createHash('md5').update(input).digest('hex');
};
