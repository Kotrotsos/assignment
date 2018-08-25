
;( function( $, window, document, undefined ) {

	"use strict";

		var pluginName = "tntcarousel",
			defaults = { };

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;

			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {
				this.main( );
			},
      render: function (obj) {
        let template = $("#" + this.settings.template).html();

        let templateFn = _.template(template);

        let templateHTML = templateFn({ 'testionials': obj });

        $( this.element ).html( templateHTML );
      },
			main: function(  ) {
        let self = this;
        let remoteData;
        $.when( $.ajax( this.settings.datasource ) ).then(function( data, textStatus, jqXHR ) {
          remoteData = data.testimonials;
          self.render(data.testimonials);


        }).then(function() {
          let items = $( self.element ).find('.c-carousel_item')
          $.each(items, (key, item) => {
            $(item).on('click', function () {
              let selectedId = $(this).attr('id');
              console.log(selectedId)

              let selectedObj = _.find(remoteData, [ 'id',  selectedId ])
              console.log(remoteData)
              console.log(selectedObj)
            });
            });
        });


			}
		} );


		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
