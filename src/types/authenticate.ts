export type Token = {
  token: string;
};

export type AuthDto = {
  username: string;
  password: string;
};

export interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}