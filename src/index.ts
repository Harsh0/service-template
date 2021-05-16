console.time('✌️  Server Started in');
// set default server timezone to UTC
process.env.TZ = 'UTC';
import 'reflect-metadata';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { createConnection } from 'typeorm';
import config from './config';

console.log('⌛ Connecting to DB...');
console.time('✅ Connected to DB in');
createConnection({
    type: 'mysql',
    host: config.MYSQL_DB_HOST,
    port: config.MYSQL_DB_PORT,
    username: config.MYSQL_DB_USERNAME,
    password: config.MYSQL_DB_PASSWORD,
    database: config.MYSQL_DB_NAME,
    entities: [__dirname + '/entities/*'],
    migrations: [__dirname + '/migrations/*'],
    subscribers: [__dirname + '/subscribers/*'],
    entityPrefix: 'Table', // TODO: remove this, if you don't want any prefix in database tables
    synchronize: !config.IS_PRODUCTION,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
    timezone: 'Z',
    maxQueryExecutionTime: 30000, // 30 seconds
})
    .then(() => {
        console.timeEnd('✅ Connected to DB in');
        require('./app');
    })
    .catch(error => console.log('❌ MySQL connect error', error));
