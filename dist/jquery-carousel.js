"use strict";

;(function ($, window, document, undefined) {

	"use strict";

	var pluginName = "tntcarousel",
	    defaults = {};

	// The actual plugin constructor
	function Plugin(element, options) {
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
		render: function render(obj) {
			var template = $("#" + this.settings.template).html();

			var templateFn = _.template(template);

			var templateHTML = templateFn({ 'testimonials': obj });

			$(this.element).html(templateHTML);
		},
		main: function main() {
			var self = this;
			var remoteData = void 0;
			$.when($.ajax(this.settings.datasource)).then(function (data, textStatus, jqXHR) {
				remoteData = data.testimonials;
				self.render(data.testimonials);
			}).then(function () {
				var items = $(self.element).find('.c-carousel_item');
				$.each(items, function (key, item) {
					$(item).on('click', function () {
						var selectedId = $(this).attr('id');
						var selectedObj = _.find(remoteData, ['id', selectedId]);
					});
				});
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