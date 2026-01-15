import mongoose from 'mongoose';
import { AppConfig } from './app.config.provider';

export const databaseProvider = {
  provide: 'DATABASE',
  useFactory: async (config: AppConfig) => {
    const connection = await mongoose.connect(config.database.url);
    return connection;
  },
  inject: ['CONFIG'],
};
