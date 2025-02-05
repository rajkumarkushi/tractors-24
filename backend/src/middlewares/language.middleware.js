const i18next = require('i18next');
const middleware = require('i18next-http-middleware');

module.exports = middleware.handle(i18next);