import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private logger: NGXLogger) {
  }

  public trace(message: string): void {
    this.logger.trace(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public log(message: string): void {
    this.logger.log(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public fatal(message: string): void {
    this.logger.fatal(message);
  }

}
