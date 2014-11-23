/*global module:false*/
module.exports = {
  default: {
    options: {
      title: "<%= package.title || package.name %>",
      message: "All went fine"
    }
  },
  dev: {
    options: {
      title: "<%= package.title || package.name %>",
      message: "Dev files ready"
    }
  },
  fonts: {
    options: {
      title: "<%= package.title || package.name %>",
      message: "Fonts generated and copied"
    }
  },
  jade: {
    options: {
      title: "<%= package.title || package.name %>",
      message: "Jade files compiled"
    }
  },
  js: {
    options: {
      title: "<%= package.title || package.name %>",
      message: "Javascript files compiled"
    }
  },
  media: {
    options: {
      title: "<%= package.title || package.name %>",
      message: "Media copied"
    }
  },
  release: {
    options: {
      title: "<%= package.title || package.name %>",
      message: "Release complete"
    }
  },
  server: {
    options: {
      title: "<%= package.title || package.name %>",
      message: "Watching files\rServer started on port 3000"
    }
  },
  stylus: {
    options: {
      title: "<%= package.title || package.name %>",
      message: "Stylus files compiled"
    }
  },
  sprite: {
    options: {
      title: "<%= package.title || package.name %>",
      message: "Sprites done"
    }
  }
};
