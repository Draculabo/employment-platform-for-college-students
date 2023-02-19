import { ResponseError } from '../types/Server';
import { Status } from '../constants/Project';
import { FlatError } from './FlatError';
import { ErrorCode } from './ErrorCode';

export class ControllerError extends FlatError {
  name: string;
  constructor(public errorCode: ErrorCode, public status: ResponseError['status'] = Status.Failed) {
    super(`${status}: ${errorCode}`);
    this.name = 'ControllerError';
  }
}

export class FError extends FlatError {
  constructor(public errorCode: ErrorCode, public status: ResponseError['status'] = Status.Failed) {
    super(`${status}: ${errorCode}`);
  }
}
