import { getCookie, setCookie } from 'cookies-next';
import { Buffer } from 'buffer';

interface TokenObj {
  token: string | undefined;
}

export const setTriviaCookie = (token: string, name: string): void => {
  const toBase64 = Buffer.from(token).toString('base64');

  setCookie(name, toBase64, {
    maxAge: 6 * 60 * 60,
    path: '/',
  });
};

const getTokenCookie = (name: string): string | undefined => {
  const cookie = getCookie(name);

  if (!cookie) return undefined;

  return Buffer.from(cookie, 'base64').toString('ascii');
};

export const getValidTokens = (): TokenObj => {
  const token = getTokenCookie('trivia_token');
  return {
    token: token,
  };
};