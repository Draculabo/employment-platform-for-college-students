import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';

const prodConfig = () => {
  return {
    mode: 'production',

    devtool: 'source-map',

    optimization: {
      minimize: false,
      moduleIds: 'named',
    },
  };
};

// @ts-ignore
export default merge(common, prodConfig());
