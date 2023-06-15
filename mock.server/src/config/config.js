const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    SEQUELIZE_DIALECT: Joi.string().required().description('sequelize dialect'),
    SEQUELIZE_HOST: Joi.string().required().description('sequelize host'),
    SEQUELIZE_PORT: Joi.number().default(5432),
    SEQUELIZE_USERNAME: Joi.string().required().description('sequelize username'),
    SEQUELIZE_PASSWORD: Joi.string().required().description('sequelize password'),
    SEQUELIZE_DATABASE_DEVELOPMENT: Joi.string().required().description('sequelize database development'),
    SEQUELIZE_DATABASE_TEST: Joi.string().required().description('sequelize database test'),
    SEQUELIZE_DATABASE_PRODUCTION: Joi.string().required().description('sequelize database production'),
    SEQUELIZE_MAX_POOL: Joi.number().default(5).description('maximum number of connection in pool'),
    SEQUELIZE_MIN_POOL: Joi.number().default(0).description('minimum number of connection in pool'),
    SEQUELIZE_IDLE: Joi.number()
      .default(10000)
      .description('the maximum time, in milliseconds, that a connection can be idle before being released'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    LINE_NOTIFY_CLIENT_ID: Joi.string().description('the client ID of the generated OAuth'),
    LINE_NOTIFY_CLIENT_SECRET: Joi.string().description('the client secret of the generated OAuth'),
    LINE_NOTIFY_REDIRECT_URI: Joi.string().description('the generated redirect URI')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  sequelize: {
    host: envVars.SEQUELIZE_HOST,
    port: envVars.SEQUELIZE_PORT,
    username: envVars.SEQUELIZE_USERNAME,
    password: envVars.SEQUELIZE_PASSWORD,
    databaseDevelopment: envVars.SEQUELIZE_DATABASE_DEVELOPMENT,
    databaseTest: envVars.SEQUELIZE_DATABASE_TEST,
    databaseProduction: envVars.SEQUELIZE_DATABASE_PRODUCTION,
    dialect: envVars.SEQUELIZE_DIALECT,
    pool: {
      max: envVars.SEQUELIZE_MAX_POOL,
      min: envVars.SEQUELIZE_MIN_POOL,
      idle: envVars.SEQUELIZE_IDLE
    },
    dialectOptions: {
      useUTC: envVars.SEQUELIZE_READ_TIMEZONE_AS_UTC,
      statement_timeout: envVars.SEQUELIZE_CONN_ACQUIRE_TIMEOUT || 1200000
    },
    timezone: envVars.SEQUELIZE_WRITE_TIMEZONE
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  },
  lineNotify: {
    client_id: envVars.LINE_NOTIFY_CLIENT_ID,
    client_secret: envVars.LINE_NOTIFY_CLIENT_SECRET,
    redirect_uri: envVars.LINE_NOTIFY_REDIRECT_URI
  },
  appConfig: {
    excelUpload: {
      forceColumnNameCheck: envVars.EXCEL_UPLOAD_FORCE_COLUMN_CHECK
    }
  }
};
