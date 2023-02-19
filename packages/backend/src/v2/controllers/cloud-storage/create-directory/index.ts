import { Type } from "@sinclair/typebox";
import { FastifyRequestTypebox, Response } from "../../../../types/Server";
import { successJSON } from "../../internal/utils/response-json";
import { useOnceService } from "../../../service-locator";
import { CloudStorageCreateDirectory } from "@/v2/services/cloud-storage/delete.type";
import { CloudStorageDirectoryService } from "@/v2/services/cloud-storage/directory";

export const cloudStorageDirectoryCreateSchema = {
    body: Type.Object(
        {
            parentDirectoryPath: Type.String({
                maxLength: 298,
                minLength: 1,
                format: "directory-path",
            }),
            directoryName: Type.String({
                maxLength: 50,
                minLength: 1,
                format: "directory-name",
            }),
        },
        {
            additionalProperties: false,
        },
    ),
};

export const cloudStorageDirectoryCreate = async (
  //@ts-ignore
    req: FastifyRequestTypebox<typeof cloudStorageDirectoryCreateSchema>,
): Promise<Response<CloudStorageCreateDirectory>> => {
    const complianceText = useOnceService("complianceText", req.ids);
    await complianceText.assertTextNormal(req.body.directoryName);

    const result = await new CloudStorageDirectoryService(
        req.ids,
        req.DBTransaction,
        req.userUUID,
    ).create(req.body.parentDirectoryPath, req.body.directoryName);

    return successJSON(result);
};
