import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  log(message: string) {
    console.log(message);
  }

  error(message: string, trace: string) {
    console.error(message, trace);
  }

  warn(message: string) {
    console.warn(message);
  }

  debug(message: string) {
    console.debug(message);
  }

  verbose(message: string) {
    console.log(message);
  }

  logError(error: Error, context?: string) {
    const errorMessage = context
      ? `[${context}] ${error.message}`
      : error.message;
    this.error(errorMessage, error.stack);
  }

  listenToUncaughtExceptions() {
    process.on('uncaughtException', (error: Error) => {
      this.logError(error, 'Uncaught Exception');
      process.exit(1);
    });
  }

  listenToUnhandledRejections() {
    process.on('unhandledRejection', (reason: PromiseRejectionEvent) => {
      const errorMessage = reason.reason
        ? reason.reason.toString()
        : 'Unhandled Promise Rejection';
      const stackTrace = reason.reason ? reason.reason.stack : '';
      this.error(`Unhandled Rejection: ${errorMessage}`, stackTrace);
    });
  }
}
