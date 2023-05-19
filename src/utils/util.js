export function createRandomString() {
  const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    randomString += allowedChars[randomIndex];
  }

  return randomString;
}