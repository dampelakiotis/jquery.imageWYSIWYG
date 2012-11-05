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

            this.$te = this.$el.prev();

            this.config = $.extend({}, $.fn.imageWYSIWYG.defaults, config);

            this.setUpContainer();
        },

        setUpContainer: function() {
            this.images = $('<ul>');

            this.container = $('<div>', {
                'class': 'images-wysiwyg-container'
            }).html(this.images);

            var self = this;
            $.each(this.config.images, function() {
                self.addImage(this);
            });

            this.$te.before(this.container);

            this.addButton();
        },

        addImage: function(image) {
            var imageTag = $('<img>', {
                src: image.src,
                alt: image.description
            });

            var description = $('<p>', {
                text: image.description
            });

            var self = this;
            var link = $('<a>', {
                'class': 'images-wysiwyg-image',
                href: '#'
            }).append(imageTag)
                .append(description)
                .click(function(e) {
                    e.preventDefault();
                    self.openImage(this);
                });

            var imageHolder = $('<li>', {
                'class': 'item'
            }).append(link);

            this.images.append(imageHolder);
        },

        addButton: function() {
            var self = this;
            this.addImageButton = $('<button>', {
                text: 'Add Image',
                'class': 'images-wysiwyg-toggle-container',
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
        },

        openImage: function(image) {
            var src = $(image).find('img').attr('src');
            this.createOverlay();
            $('.images-wysiwyg-modal').html('<img src="'+src+'" alt="" />');
            $('.images-wysiwyg-modal img').load(function() {
                var imgWidth = $('.images-wysiwyg-modal img').width();
                var imgHeight = $('.images-wysiwyg-modal img').height();
                var win = $(window),
                    fullscreen = $('.images-wysiwyg-modal'),
                    image = fullscreen.find('img'),
                    imageWidth = image.width(),
                    imageHeight = image.height(),
                    imageRatio = imageWidth / imageHeight;
                var winWidth = win.width(),
                    winHeight = win.height();
                var pageWidth = Math.round((winHeight / 2) * imageRatio),
                    pageHeight = winHeight / 2;
                image.css({
                    width: pageWidth,
                    height: pageHeight
                });
                $('.images-wysiwyg-modal').css({
                    'top': (winHeight / 2) - (pageHeight / 2),
                    'left': (winWidth / 2) - (pageWidth / 2)
                }).animate({'opacity':'1'}, 200, 'linear');
            });
        },

        createOverlay: function() {
            $('body').append('<div class="images-wysiwyg-overlay"></div><div class="images-wysiwyg-modal"></div>')
                .css({'overflow-y':'hidden'});
            $('.images-wysiwyg-overlay').animate({'opacity':'0.6'}, 200, 'linear').click(function() {
                $('.images-wysiwyg-modal, .images-wysiwyg-overlay')
                .animate({'opacity':'0'}, 200, 'linear', function(){
                    $('.images-wysiwyg-modal, .images-wysiwyg-overlay').remove();
                });
            });
        }
    };

    $.fn.imageWYSIWYG = function(config) {
        var obj = Object.create(imageWYSIWYG);

        return this.each(function() {
            obj.init(this, config);
        });
    };

    $.fn.imageWYSIWYG.defaults = {
        images: []
    };

}(jQuery));
