/**
 * 获取大小写字母与数字组成的随机字符串，默认16位
 * @param {*} digit 位数
 * @returns 生成的随机字符串
 */
export function createRandomString(digit = 16) {
  const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  for (let i = 0; i < digit; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    randomString += allowedChars[randomIndex];
  }

  return randomString;
}