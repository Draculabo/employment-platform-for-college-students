import { CloudStorageMoveService } from "@/v2/services/cloud-storage/move";
import { FastifyRequestTypebox, Response } from "../../../../types/Server";
import { successJSON } from "../../internal/utils/response-json";
import { Type } from "@sinclair/typebox";

export const cloudStorageMoveSchema = {
    body: Type.Object({
        targetDirectoryPath: Type.String({
            format: "directory-path",
        }),
        uuids: Type.Array(
            Type.String({
                format: "uuid-v4",
            }),
            {
                minItems: 1,
                maxItems: 50,
            },
        ),
    }),
};

export const cloudStorageMove = async (
  //@ts-ignore
    req: FastifyRequestTypebox<typeof cloudStorageMoveSchema>,
): Promise<Response> => {
    const cloudStorageMoveSVC = new CloudStorageMoveService(
        req.ids,
        req.DBTransaction,
        req.userUUID,
    );

    await cloudStorageMoveSVC.move({
        targetDirectoryPath: req.body.targetDirectoryPath,
        uuids: req.body.uuids,
    });

    return successJSON({});
};
