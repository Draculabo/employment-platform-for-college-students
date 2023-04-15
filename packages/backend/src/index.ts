// import 'reflect-metadata';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastify, { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fastifyRequestID from '@fastify-userland/request-id';
import fastifyTypeORMQueryRunner from '@fastify-userland/typeorm-query-runner';
import pointOfView from '@fastify/view';
import { Status } from './constants/Project';
import { ErrorCode } from './error/ErrorCode';
import { fastifyAPILogger } from './plugins/fastify/api-logger';
import { initTasks } from './v2/tasks';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { MetricsConfig, Server } from './constants/Config';
import { loggerServer, parseError } from './logger';
import { registerV2Routers } from './utils/RegisterRouter';
import { v2Routes } from './v2/controllers/routes';
import __dirname from './utils/__dirname';
import { fastifyAuthenticate } from './plugins/fastify/authenticate';
import { orm } from './service/thirdParty/TypeORMService';
import formBody from '@fastify/formbody';
import { MetricsSever } from './model/metrics';
import { Type } from '@sinclair/typebox';
import { ServerResponse } from 'http';
import { ajvSelfPlugin } from './plugins/Ajv';
import { fastifySwagger } from './plugins/fastify/swagger';
import eta from 'eta';
const app = async (server: FastifyInstance) => {
  server.setErrorHandler((err, request, reply) => {
    if (err.validation) {
      void reply.status(200).send({
        status: Status.Failed,
        code: ErrorCode.ParamsCheckFailed,
      });
      return;
    }
    loggerServer.error('request unexpected interruption', parseError(err));
    console.log(err);

    // if (!request.notAutoHandle) {
    //   void reply.status(200).send({
    //     status: Status.Failed,
    //     code: ErrorCode.CurrentProcessFailed,
    //   });
    //   return;
    // }
    return new Error(`request-id: ${request.reqID}. session-id: ${request.sesID}`);
  });
  // void server.register(AutoLoad, {
  //   dir: join(__dirname, 'plugins'),
  //   options: opts,
  // });
  // This loads all plugins defined in routes
  // define your routes in one of these
  // void server.register(AutoLoad, {
  //   dir: join(__dirname, '../', '/routes'),
  // });
  // database initial
  // orm();
  await orm()
    .then(async (dataSource) => {
      await Promise.all([
        server.register(cookie),
        // 返回模板
        server.register(pointOfView, {
          engine: {
            eta,
          },
        }),
        server.register(fastifySwagger),
        server.register(fastifyAuthenticate),
        server.register(cors, {
          methods: ['GET', 'POST', 'OPTIONS'],
          allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id', 'x-session-id'],
          credentials: true,
          maxAge: 100,
        }),
        server.register(formBody),
        server.register(fastifyRequestID),
      ]).catch((err) => {
        console.log(err);
        throw new Error(err);
      });
      {
        const respErr = JSON.stringify({
          status: Status.Failed,
          code: ErrorCode.CurrentProcessFailed,
        });
        await server.register(fastifyTypeORMQueryRunner, {
          dataSource,
          transaction: true,
          match: (request) => request.routerPath?.startsWith('/v2') || false,
          respIsError: (respStr) => respStr === respErr,
        });
      }
      await server.register(fastifyAPILogger);
      registerV2Routers(server, v2Routes);
      await initTasks();
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(server.printRoutes());
  server.ready().then(() => {
    server.swagger();
  });
  server.listen(
    {
      port: 8888,
      host: '0.0.0.0',
    },
    (err, address) => {
      if (err) {
        loggerServer.error('server launch failed', parseError(err));
        process.exit(1);
      }
      loggerServer.info(`server launch success, ${address}`);
    }
  );
};
const instance = fastify({
  // pluginTimeout: 50000,
  // bodyLimit: 15485760,
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: true,
      useDefaults: true,
    },
    plugins: [ajvSelfPlugin],
  },

  caseSensitive: false,
}).withTypeProvider<TypeBoxTypeProvider>();
if (MetricsConfig.enabled) {
  new MetricsSever(instance).start();
}
app(instance);
process.on('unhandledRejection', (err) => {
  console.error(err);
});
