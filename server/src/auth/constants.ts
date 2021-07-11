import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'secretKey', // 不应该暴露出来
};

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
