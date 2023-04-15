export const descryToken = (token: string) => {
  const arr = token.split('.');
  const msg = arr[1];
  let jsonStr;
  let res;
  try {
    jsonStr = window.atob(msg);
    res = JSON.parse(jsonStr);
  } catch (error) {
    throw error;
  }
  return res;
};
