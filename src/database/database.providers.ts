import { DataSource } from 'typeorm';

import { AppDataSource } from './data-source';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: async (): Promise<DataSource> =>
            AppDataSource.isInitialized ? AppDataSource : await AppDataSource.initialize(),
    },
];
