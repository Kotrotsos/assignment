

// This should load the jQuery plugin
$( () => {

  /* Options:
     template: which template to use to render the carousel
     datasource: the endpoint where the data should come from.
     When datasource is not given here. It's expected on the HTML element as an attribute data-datasource
     This way you can have multiple carousels using different datasources. */
  let options = {
    template: "carousel-template",
    datasource: "https://wt-83e58c9f13b3df3a68adfe5263e85725-0.sandbox.auth0-extend.com/TNT-Testimonials"
  }

  $('[data-carousel]').tntCarousel(options);

})
