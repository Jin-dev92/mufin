import { HealthCheck as NestHealthCheck } from '@nestjs/terminus';
import { applyDecorators, SetMetadata } from '@nestjs/common';
import { HealthCheckOptions } from '@nestjs/terminus/dist/health-check';

export function CustomHealthCheck(
  options?: HealthCheckOptions,
): MethodDecorator {
  return applyDecorators(
    NestHealthCheck(options), // @HealthCheck 데코레이터를 적용
    SetMetadata('customHealthCheck', options), // 커스텀 메타데이터 추가
  );
}
