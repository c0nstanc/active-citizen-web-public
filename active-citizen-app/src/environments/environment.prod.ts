// `.env.ts` is generated by the `npm run env` command
import env from './.env';
import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  company: 'ActiveCitizen',
  version: env.npm_package_version,
  serverUrl: '/api',
  envName: 'PROD',
  API_URL: 'assets/api',
  defaultLanguage: 'el',
  supportedLanguages: ['el', 'en'],
  serverLoggingUrl: '',
  serverLogLevel: NgxLoggerLevel.OFF, // TODO - Change me once server is available
  disableConsoleLogging: true,
  logLevel: NgxLoggerLevel.INFO
};
