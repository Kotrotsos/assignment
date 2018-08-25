
;( function( $, window, document, undefined ) {

	"use strict";

		var pluginName = "tntcarousel",
			defaults = { };

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
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
			main: function(  ) {
        _.templateSettings = {
    evaluate:    /{{([\s\S]+?)}}/g,
    interpolate: /{{([\s\S]+?)}}/g,
    escape:      /{{-([\s\S]+?)}}/g
};
				// some logic
        console.log(this.settings.template)
        let template = $("#" + this.settings.template).html();
        console.log('x', template);
        var templateFn = _.template(template);
        console.log('fn, ', templateFn)
       var templateHTML = templateFn({ 'comment': 'sup', 'commenter': 'me' });
				$( this.element ).html( templateHTML );
			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
