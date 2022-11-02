import { logger } from '@sweetcake/interfaces/logger/logger';
import { BadRequestException } from '@nestjs/common';

export const baseException = (level: string, error: any) => {
  logger.error(level, error);
  throw new BadRequestException(error.message);
};
