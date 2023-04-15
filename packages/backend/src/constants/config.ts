import { config } from '@/utils/ParseConfig';
import packages from '../../package.json';
// eslint-disable-next-line import/default

export const isDev = process.env.MODE === 'development';
export const isTest = process.env.IS_TEST || false;

export const Server = {
  port: config.server.port,
  name: 'employment',
  version: packages.version,
  env: config.server.env,
};

export const Redis = {
  host: config.redis.host,
  port: config.redis.port,
  username: config.redis.username || '',
  password: config.redis.password,
  db: config.redis.db,
  queueDB: config.redis.queueDB,
};

export const MySQL = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.username,
  password: config.mysql.password,
  db: config.mysql.db,
};

export const Website = config.website;

export const WeChat = {
  web: {
    enable: config.login.wechat.web.enable,
    appId: config.login.wechat.web.app_id,
    appSecret: config.login.wechat.web.app_secret,
  },
  mobile: {
    enable: config.login.wechat.mobile.enable,
    appId: config.login.wechat.mobile.app_id,
    appSecret: config.login.wechat.mobile.app_secret,
  },
};

export const Github = {
  enable: config.login.github.enable,
  clientId: config.login.github.client_id,
  clientSecret: config.login.github.client_secret,
};

export const PhoneSMS = {
  enable: config.login.sms.enable,
  force: config.login.sms.force,
  testUsers: config.login.sms.test_users.map((user) => {
    return {
      phone: String(user.phone),
      code: user.code,
    };
  }),
  chineseMainland: {
    accessId: config.login.sms.chinese_mainland.access_id,
    accessSecret: config.login.sms.chinese_mainland.access_secret,
    templateCode: config.login.sms.chinese_mainland.template_code,
    signName: config.login.sms.chinese_mainland.sign_name,
  },
  global: {
    accessId: config.login.sms.global.access_id,
    accessSecret: config.login.sms.global.access_secret,
    templateCode: config.login.sms.global.template_code,
    signName: config.login.sms.global.sign_name,
  },
};

export const JWT = {
  secret: config.jwt.secret,
  algorithms: config.jwt.algorithms,
};

export const Whiteboard = {
  accessKey: config.whiteboard?.access_key,
  secretAccessKey: config.whiteboard?.secret_access_key,
  convertRegion: config.whiteboard?.convert_region,
};

export const CloudStorage = {
  concurrent: config.cloud_storage.concurrent,
  singleFileSize: config.cloud_storage.single_file_size,
  totalSize: config.cloud_storage.total_size,
  prefixPath: config.cloud_storage.prefix_path,
  allowFileSuffix: config.cloud_storage.allow_file_suffix,
};

export const StorageService = {
  type: config.storage_service.type,
  oss: {
    bucket: config.storage_service.oss.bucket,
    region: config.storage_service.oss.region,
    accessKey: config.storage_service.oss.access_key,
    accessKeySecret: config.storage_service.oss.secret_key,
    endpoint: config.storage_service.oss.endpoint,
  },
};

export const User = {
  avatar: {
    size: config.user.avatar.size,
    allowSuffix: config.user.avatar.allow_suffix,
  },
};

export const OAuth = {
  logo: {
    prefixPath: config.oauth.logo.prefix_path,
    size: config.oauth.logo.size,
    allowSuffix: config.oauth.logo.allow_suffix,
  },
};

export const LogConfig = {
  pathname: config.log.pathname,
  filename: config.log.filename,
};

export const MetricsConfig = {
  enabled: process.env.Emp_METRICS_ENABLED || config.metrics.enable,
  endpoint: process.env.Emp_METRICS_ENDPOINT || config.metrics.endpoint,
  port: Number(process.env.Emp_METRICS_PORT || config.metrics.port),
};

export const ChatGPTConfig = {
  secret: process.env.Chat_Secret || config.chatgpt.secret,
  proxy: process.env.CHAT_Proxy || config.chatgpt.proxy,
};
