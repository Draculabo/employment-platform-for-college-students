import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';

// @ts-ignore
export default merge(common, {
  mode: 'development',
  devtool: 'source-map',
  watchOptions: {
    aggregateTimeout: 600,
    ignored: ['node_modules/**'],
  },
  devServer: {
    hot: true,
  },
  // plugins: [new webpack.NoEmitOnErrorsPlugin()],
});
