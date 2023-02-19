import { FastifySchema, PatchRequest } from "../../types/Server";
import { FastifyReply } from "fastify";
import { Logger, LoggerAPI } from "../../logger";
import { AbstractController } from "./index";

export type ControllerClass<RES, REQ> = new (params: ControllerClassParams) => AbstractController<
//@ts-ignore
    RES,
    REQ
>;

export interface ControllerStaticType<RES, REQ> extends ControllerClass<RES, REQ> {
  //@ts-ignore
    readonly schema: FastifySchema<RES>;
}

export interface ControllerClassParams {
    req: PatchRequest;
    reply: FastifyReply;
    logger: Logger<LoggerAPI>;
}
