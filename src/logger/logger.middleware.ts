import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl, body, query } = req;

    res.on('finish', () => {
      const logMessage = `
        ${method},
        ${baseUrl},
        ${res.statusCode},
        body: ${JSON.stringify(body)},
        query: ${JSON.stringify(query)} `;

      this.loggingService.log(logMessage);
    });
    next();
  }
}
