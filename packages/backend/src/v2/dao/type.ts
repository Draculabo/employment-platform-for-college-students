import { Type } from '@sinclair/typebox';
export const ConfigSchema = Type.Object({
  order: Type.Tuple([Type.Any(), Type.Union([Type.Literal('ASC'), Type.Literal('DESC')])]),
  distinct: Type.Boolean(),
  limit: Type.Number(),
  offset: Type.Number(),
});
export const optionalConfigSchema = Type.Optional(ConfigSchema);
