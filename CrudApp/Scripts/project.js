var project = {
  layout: {},
  controllers: {},
  page: {
    handlers: {},
    startUp: null
  },
  services: { blogs: {} }
};

project.layout.startUp = function () {
    if(project.page.startUp){
      console.debug("project.layout.startUp has fired and found project.page.startUp.");
      project.page.startUp();
    }
};

$(document).ready(project.layout.startUp);