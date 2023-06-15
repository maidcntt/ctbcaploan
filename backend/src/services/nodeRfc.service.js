const { Pool } = require('node-rfc');
const httpStatus = require('http-status');
const fs = require('fs');
const Path = require('path');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const pool = (() => {
  let dest;
  try {
    const data = fs.readFileSync(Path.join(__dirname, './../../sapnwrfc.ini'), 'utf-8');
    const lines = data.split('\n');
    const destLine = lines.find((line) => /^DEST=/.test(line));
    const destKeyValue = destLine.split('=');
    // eslint-disable-next-line prefer-destructuring
    dest = destKeyValue[1];
  } catch (error) {
    logger.error('Unable to retrieve SAP system ID, please verify sapnwrfc.ini');
  }
  return new Pool({ connectionParameters: { dest }, poolOptions: { high: 32 } });
})();

const connect = async () => {
  try {
    return await pool.acquire();
  } catch (error) {
    logger.error(`Connected to SAP ABAP NetWeaver system failed. message: ${error.message}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Connect to RFC error');
  }
};

const callAPI = async (functionName, params) => {
  const client = await connect();
  try {
    const result = await client.call(functionName, params);
    return result;
  } catch (error) {
    logger.error(JSON.stringify(error));
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Call RFC error. ${error.message}`);
  } finally {
    await pool.release(client);
  }
};

module.exports = {
  callAPI
};
