/*global module:false*/
module.exports = {
  start: {
      tasks: ['watch', 'connect:server', 'notify:server'],
      options: {
          logConcurrentOutput: true
      }
  }
};