/* global module:true */
module.exports = {
  release: {
    expand: true,
    cwd: '<%=build%>/css/',
    src: ['*.css'],
    dest: '<%=build%>/css/',
    options: {
      report: "gzip"
    }
  }
};
