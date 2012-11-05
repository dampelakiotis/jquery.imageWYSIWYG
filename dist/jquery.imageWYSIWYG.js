/*! jQuery Imagewysiwyg - v0.1.0 - 2012-11-05
* https://github.com/nickromano/jquery.imageWYSIWYG
* Copyright (c) 2012 Nick Romano; Licensed GPL */

(function($) {
    "use strict";

    var imageWYSIWYG = {
        init: function(el, config) {
            this.el = el;
            this.$el = $(el);

            this.$te = this.$el.prev();

            this.config = $.extend({}, $.fn.imageWYSIWYG.defaults, config);

            this.setUpContainer();
        },

        setUpContainer: function() {
            this.images = $('<ul>');

            this.container = $('<div>', {
                'class': 'images-wysiwyg-container'
            }).html(this.images);

            this.$te.before(this.container);

            this.addButton();
        },

        addButton: function() {
            var self = this;
            this.addImageButton = $('<button>', {
                text: 'Add Image',
                'class': 'addImage',
                click: function(e) {
                    e.preventDefault();
                    self.openPicker();
                }
            });
            this.$te.before(this.addImageButton);
        },

        openPicker: function() {
            if (this.container.css('display') === 'block') {
                this.container.css('display', 'none');
                this.addImageButton.text('Add Image');
            } else {
                this.container.css('display', 'block');
                this.addImageButton.text('Close');
            }
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
