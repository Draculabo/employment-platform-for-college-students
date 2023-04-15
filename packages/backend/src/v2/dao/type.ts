import { Type } from '@sinclair/typebox';
export const ConfigSchema = Type.Object({
  order: Type.Optional(Type.Tuple([Type.Any(), Type.Union([Type.Literal('ASC'), Type.Literal('DESC')])])),
  distinct: Type.Optional(Type.Boolean()),
  pageSize: Type.Optional(Type.Number()),
  pageNo: Type.Number(),
});
export interface ConfigType<P> {
  order?: [keyof P & string, 'ASC' | 'DESC'];
  distinct?: boolean;
  limit?: number;
  offset?: number;
}
export const optionalConfigSchema = Type.Optional(ConfigSchema);
