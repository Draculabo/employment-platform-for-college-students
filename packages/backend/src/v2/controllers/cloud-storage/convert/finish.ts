import { Type } from "@sinclair/typebox";
import { FastifyRequestTypebox, Response } from "../../../../types/Server";
import { successJSON } from "../../internal/utils/response-json";

export const cloudStorageConvertFinishSchema = {
    body: Type.Object(
        {
            fileUUID: Type.String({
                format: "uuid-v4",
            }),
        },
        {
            additionalProperties: false,
        },
    ),
};

export const cloudStorageConvertFinish = async (
  //@ts-ignore
    req: FastifyRequestTypebox<typeof cloudStorageConvertFinishSchema>,
): Promise<Response> => {

    return successJSON({});
};
