import path from 'path';
import { __dirname } from './assistant.mjs';
const resolvePath = (...relativePath) => path.resolve(__dirname, '..', ...relativePath);

export default {
  dist: resolvePath('dist'),
  appSrc: resolvePath('src'),
  entryFile: resolvePath('src', 'index.ts'),
  testEntryFile: resolvePath('test', 'index.ts'),
  testDist: resolvePath('dist-test'),
  tsConfig: resolvePath('tsconfig.json'),
};
