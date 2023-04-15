import { IResponse, IUser, IUserInfo } from '@/types/type';
import { get, post } from '../config';
import { ResponseData, resolve } from '../type';
import { stringify } from 'querystring';
import queryString from 'query-string';
import { FinishedOptions } from 'stream';
interface RegisterResponse {
  token: string;
}
export interface UserBaseInfo {
  account?: string;
  username: string;
  avatar_url: string;
  userUUID: string;
}
export interface UserLoginRequest {
  account: string;
  password: string;
}
export function login(data: UserLoginRequest) {
  return resolve(post<ResponseData<RegisterResponse>>('/login', data));
}
export function info(data: { user_id: string }) {
  return resolve(get<ResponseData<IUserInfo>>(`/user/info?user_id=${data.user_id}`));
}
interface ResetPasswordRequest {
  phone: string;
  password: string;
}
export function resetPassword(data: ResetPasswordRequest) {
  return resolve(post<ResponseData<{}>>('/user/reset-password', data));
}
export function registerUser(data: UserLoginRequest) {
  return resolve(post<ResponseData<RegisterResponse>>('/register', data));
}

export function updateUserInfo(data: IUserInfo) {
  return resolve(post<any>('/user/update', data));
}

export function logout(data: { username: string }) {
  return resolve(post<any>('/user/logout', data));
}

export function verify(data: { token: string; username: string }) {
  return resolve(post<any>('/user/verify', data));
}

export function queryUserInfoById(data: { uid: number }) {
  return resolve(post<any>('/user/queryUserById', data));
}
interface SMSStartRequest {
  phone: string;
}
interface SMSFinishRequest {
  phone: string;
  code: number;
}
export function loginByPhoneStart(data: SMSStartRequest) {
  return resolve(post<ResponseData<{}>>('/user/register/phone/sendMessage', data));
}
export function loginByPhoneFinish(data: SMSFinishRequest) {
  return resolve(post<ResponseData<{}>>('/user/register/phone', data));
}
export function bindingPhoneStart(data: SMSStartRequest) {
  return resolve(post<ResponseData<{}>>('/user/bindingPhone', { ...data }));
}

export function bindingPhoneFinish(data: SMSFinishRequest) {
  return resolve(post<ResponseData<{}>>('/user/bindingPhone/sendMessage', { ...data }));
}

export function MockDataStart(data: SMSStartRequest) {
  return resolve(post<ResponseData<{}>>('/user/bindingPhone', { ...data }));
}

export function MockDataFinish(data: SMSFinishRequest): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const code = window.parseInt(data.code.toString().charAt(0));
    if (code < 5) {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    } else {
      setTimeout(() => {
        resolve(false);
      }, 2000);
    }
  });
}
interface getUserInfoRequest {
  user_id?: string;
}
export function getUserInfo(data: getUserInfoRequest = {}) {
  return resolve(
    get<ResponseData<IUserInfo>>(
      queryString.stringifyUrl({
        url: '/user/info',
        query: {
          ...data,
        },
      })
    )
  );
}
interface UpdateUserPasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export function pwdUpdate(data: UpdateUserPasswordRequest) {
  return resolve(post<ResponseData<{}>>('/user/update-password', data));
}
interface UploadAvatarStartRequest {
  fileName: string;
  fileSize: number;
}
export interface UploadAvatarResult {
  fileUUID: string;
  ossFilePath: string;
  policy: string;
  ossDomain: string;
  signature: string;
}
export function uploadAvatarStart(data: UploadAvatarStartRequest) {
  return resolve(post<ResponseData<UploadAvatarResult>>('/user/upload-avatar/start', data));
}
export interface UploadAvatarFinishPayload {
  fileUUID: string;
}

export interface UploadAvatarFinishResult {
  token: string;
}
export function uploadAvatarFinish(data: UploadAvatarFinishPayload) {
  return resolve(post<ResponseData<UploadAvatarFinishResult>>('/user/upload-avatar/finish', data));
}
