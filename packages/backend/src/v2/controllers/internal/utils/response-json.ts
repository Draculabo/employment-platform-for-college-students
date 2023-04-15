import { ResponseError, ResponseSuccess } from '../../../../types/Server';
import { Status } from '../../../../constants/Project';
import { ErrorCode } from '../../../../error/ErrorCode';
import { assign } from 'lodash';

export const successJSON = <O>(data: O): ResponseSuccess<O> => {
  return {
    status: Status.Success,
    data,
  };
};

export const failJSON = (params: Partial<ResponseError>): ResponseError => {
  return assign(
    {},
    {
      status: Status.Failed,
      code: ErrorCode.UnknownError,
    },
    params
  );
};
