const AWS = require("aws-sdk")

const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
AWS.config.credentials = credentials;

module.exports = { AWS, credentials }