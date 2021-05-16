import dotenv from 'dotenv';

// load the environment variables from the .env file
dotenv.config({
    path: `./var/${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}.env`,
});

if (!process.env.APP_PORT) {
    console.log('❌ Please pass APP_PORT in environment');
    process.exit(0);
}

const isProduction = (() => {
    return process.env.NODE_ENV === 'production';
})();

const config = {
    NODE_ENV: process.env.NODE_ENV,
    IS_PRODUCTION: isProduction,
    APP_PORT: process.env.APP_PORT,
    HOSTNAME: process.env.HOSTNAME || '',
    DEBUG: process.env.DEBUG,
    GITHUB_COMMIT_SHA: process.env.GITHUB_COMMIT_SHA || '',
    GITHUB_HOMEPAGE_URL: process.env.npm_package_homepage || '',
    /**
     * All default configs goes here
     */
    ACCESS_TOKEN_VALIDITY_SECONDS: 1800, // 30 minutes
    /**
     * All Secret config goes here
     */
    JWT_SECRET: process.env.JWT_SECRET || 'sssssshhhh',
    MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
    MYSQL_DB_PORT: Number(process.env.MYSQL_DB_PORT),
    MYSQL_DB_NAME: process.env.MYSQL_DB_NAME,
    MYSQL_DB_USERNAME: process.env.MYSQL_DB_USERNAME,
    MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
};

export default config;
