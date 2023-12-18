export type role = 'ADMIN' | 'USER'

export interface AuthToken {
  roles: role[];
  sub: string;
  iat: number;
  exp: number;
}
