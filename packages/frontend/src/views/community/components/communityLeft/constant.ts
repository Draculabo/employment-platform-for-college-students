export interface IKeyValueMap {
  label: string;
  value: string;
}
export const tabs: Array<IKeyValueMap> = [
  {
    label: '正序',
    value: 'DESC',
  },
  {
    label: '倒序',
    value: 'ASC',
  },
];
