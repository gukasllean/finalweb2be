export class JwtPayloadDto {
  sub: number;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}