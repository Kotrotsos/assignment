"use strict";

/* This plugin uses the defacto jQuery plugin structure */;
(function ($, window, document, undefined) {

  "use strict";

  var pluginName = "tntCarousel",
      defaults = {};

  function Plugin(element, options) {
    this.cycle = 0;
    this.element = element;

    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function init() {
      this.main();
    },

    /* LoDash template functions. Currently the templates are inline in the page.
       I can see them being included as an external template. But for now they are inline. */

    render: function render(obj) {
      var template = $("#" + this.settings.template).html();
      var templateFn = _.template(template);
      var templateHTML = templateFn({ 'testimonials': obj });
      $(this.element).html(templateHTML);
    },

    select: function select(self, selectedId) {
      var element = self.element;

      // check if this is the first time the plugin has run. If so. Select the first item
      if (this.cycle == 0) {
        var firstItem = $(element).find('.c-carousel_item').first();
        var firstItemId = "#" + firstItem.attr('id');

        /* This fetches the HTML from the selected strip item and copy's it in the full carousel_section
          This way it's easier to get the desired responsive behaviour . */

        $(element).find('.c-carousel_full').html($(firstItemId).find('.c-carousel_section').html());

        firstItem.addClass('c-carousel_item-active');

        // cycle up so we know we have ran before
        this.cycle++;
      } else {

        // Select the item that was chosen through click or tap;
        $(element).find('.c-carousel_item').removeClass('c-carousel_item-active');
        $('#' + selectedId).addClass('c-carousel_item-active');

        $(element).find('.c-carousel_full').html($('#' + selectedId).find('.c-carousel_section').html());
      }
    },

    activate: function activate(el, self) {
      $('.c-carousel_item').removeClass('c-carousel_item-active');
      $(el).addClass('c-carousel_item-active');

      // This I should be able to dry up.
      $(self.element).find('.c-carousel_full').html($($('#' + el.attr('id'))).find('.c-carousel_section').html());
    },
    next: function next(self) {

      var el = $('.c-carousel_item-active').next('.c-carousel_item');

      if (el.length) {
        this.activate(el, self);
      }
    },

    previous: function previous(self) {

      var el = $('.c-carousel_item-active').prev('.c-carousel_item');
      if (el.length) {
        this.activate(el, self);
      }
    },

    main: function main() {
      var self = this;
      var remoteData = void 0;
      var datasource = void 0;

      /*
      Check where the datasource is defined. Either in the options object or on the element itself
      using data attribute.
      */
      datasource = this.settings.datasource || $(self.element).attr('data-datasource');

      /* Fetches JSON from webkit (Serverless Functions by AUTO0. */
      $.when($.ajax(datasource)).then(function (data, textStatus, jqXHR) {
        remoteData = data.testimonials;
        self.render(data.testimonials);
      }).then(function () {
        var items = $(self.element).find('.c-carousel_item');

        $.each(items, function (key, item) {
          $(item).on('click tap', function () {
            var selectedId = $(this).attr('id');
            self.select(self, selectedId);
          });
        });

        $(document).on('keydown', function (event) {
          if (event.originalEvent.code == 'ArrowRight') {
            self.next(self);
          }
          if (event.originalEvent.code == 'ArrowLeft') {
            self.previous(self);
          }
        });

        $('.c-carousel_nav-forward').on('click tap', function () {
          self.next(self);
        });

        $('.c-carousel_nav-back').on('click tap', function () {
          self.previous(self);
        });

        // Select the first one of the carousel items.
        self.select(self, null);
      });
    }
  });

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);