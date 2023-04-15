import { errorMessage } from '../message';

type LocalStorageValue<T> = { value: T; expires: number };

export function setLocalStorage(key: string, value: unknown, expires: number = 1000 * 60 * 60 * 3) {
  const result: LocalStorageValue<typeof value> = { value, expires: Date.now() + expires };
  localStorage.setItem(key, JSON.stringify(result));
  return true;
}

export function getLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  if (!value) {
    return null;
  }
  let result: LocalStorageValue<unknown>;
  try {
    result = JSON.parse(value);
  } catch (error) {
    errorMessage((error as Error).message);
    throw error;
  }
  // 如果过期了就删掉
  if (result.expires < Date.now()) {
    localStorage.removeItem(key);
    return false;
  }
  return result.value;
}

export function removeLocalStorage(key: string) {
  if (!getLocalStorage(key)) {
    return false;
  }
  localStorage.removeItem(key);
  return true;
}
