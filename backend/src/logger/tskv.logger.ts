import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private escape(value: string): string {
    return value
      .replace(/\\/g, '\\\\')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/=/g, '\\=');
  }

  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const optional = optionalParams.length
      ? `optional=${this.escape(JSON.stringify(optionalParams))}`
      : '';

    return (
      [
        'tskv',
        `level=${this.escape(String(level))}`,
        `message=${this.escape(String(message))}`,
        optional,
      ]
        .filter(Boolean)
        .join('\t') + '\n'
    );
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('warn', message, ...optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
}
