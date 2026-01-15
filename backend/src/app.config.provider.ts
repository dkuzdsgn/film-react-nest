import { ConfigModule } from '@nestjs/config';
const applicationConfig = process.env;
export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      url: applicationConfig.DATABASE_URL,
      driver: applicationConfig.DATABASE_DRIVER,
    },
  },
};
