import { ConsoleLogger } from '@nestjs/common';

export class ReportLogger extends ConsoleLogger {
  verbose(message: any) {
    console.log('【Verbose】日志上报', message);
    super.verbose.apply(this, arguments);
  }

  log(message: any) {
    console.log('【Log】日志上报', message);
    super.log.apply(this, arguments);
  }

  debug(message: any) {
    console.log('【Debug】日志上报', message);
    super.debug.apply(this, arguments);
  }

  warn(message: any) {
    console.log('【Warn】日志上报', message);
    super.warn.apply(this, arguments);
  }

  error(message: any) {
    console.error('【Error】日志上报', message);
    super.error.apply(this, arguments);
  }
}
