"use strict";

// This should load the jQuery plugin
$(function () {
  var options = {
    template: "carousel-template",
    datasource: "https://wt-83e58c9f13b3df3a68adfe5263e85725-0.sandbox.auth0-extend.com/TNT-Testimonials"
  };

  $('[data-carousel]').tntcarousel(options);
});