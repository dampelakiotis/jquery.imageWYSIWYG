/*
 * jquery.imageWYSIWYG
 * https://github.com/nickromano/jquery.imageWYSIWYG
 *
 * Copyright (c) 2012 Nick Romano
 * Licensed under the GPL license.
 */

(function($) {
    "use strict";

    var imageWYSIWYG = {
        init: function(el, config) {
            this.el = el;
            this.$el = $(el);

            this.config = $.extend({}, $.fn.imageWYSIWYG.defaults, config);
        }
    };

    $.fn.imageWYSIWYG = function(config) {
        var obj = Object.create(imageWYSIWYG);

        return this.each(function() {
            obj.init(this, config);
        });
    };

    $.fn.imageWYSIWYG.defaults = {
    };


}(jQuery));
