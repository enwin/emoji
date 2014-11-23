/*global module:false */

module.exports = {
  server: {
    options: {
      port: 3000,
      base: '<%= build %>',
      keepalive: true,
      hostname: '*'
    }
  }
};
