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
            var modal = this.createOverlay();
            this.loadViewer(image, modal);
        },

        createOverlay: function() {
            var overlay = $('<div>', {'class': 'images-wysiwyg-overlay'}),
                modal = $('<div>', {'class': 'images-wysiwyg-modal'});

            $('body').append(overlay)
                .append(modal)
                .css({'overflow-y':'hidden'});
            overlay.animate({'opacity':'0.6'}, 200, 'linear')
                .click(function() {
                    $(overlay, modal).animate({'opacity':'0'}, 200, 'linear', function(){
                        overlay.remove();
                        modal.remove();
                    });
                });
            return modal;
        },

        loadViewer: function(image, modal) {
            var src = $(image).find('img').attr('src');
            modal.html('<img src="'+src+'" alt="" />');
            var modalImage = modal.find('img');
            var self = this;
            modalImage.load(function() {
                var imgWidth = modalImage.width(),
                    imgHeight = modalImage.height(),
                    win = $(window),
                    imageRatio = modalImage.width() / modalImage.height();
                var winHeight = win.height();
                var pageWidth = Math.round((winHeight / 2) * imageRatio),
                    pageHeight = winHeight / 2;

                modalImage.css({
                    width: pageWidth,
                    height: pageHeight
                });

                modal.css({
                    'top':  (winHeight / 2) - (pageHeight / 2),
                    'left': (win.width() / 2) - (pageWidth / 2)
                }).animate({'opacity':'1'}, 200, 'linear');

                self.addSizeSelector(modal, modalImage, imgHeight, pageHeight, imageRatio);
            });
        },

        addSizeSelector: function(modal, modalImage, imgHeight, pageHeight, imageRatio) {
            // if the size of image in the modal is larger than its original size then make the slider adjust accordingly
            if ( pageHeight > imgHeight ) {
                imgHeight = pageHeight;
            }

            var newSize = pageHeight / imgHeight,
                slider = $('<input>', {
                    type: 'range',
                    min: '0',
                    max: imgHeight
                }).on('change', function() {
                    var currentSize = $(this).attr('value');
                    modalImage.css({
                        height: currentSize,
                        width: currentSize * imageRatio
                    });
                });

            var modalDescription = $('<p>', {
                text: 'Size: '
            }).css({
                margin: '0',
                background: 'white'
            }).append(slider);

            slider.attr('value',pageHeight);

            modalImage.before(modalDescription);
            
            this.addInsertButton(modalDescription);
        },

        addInsertButton: function(modalDescription) {
            var insertButton = $('<button>', {
                text: 'Insert',
                'class': 'images-wysiwyg-insert-image',
                click: function(e) {
                    e.preventDefault();
                }
            });

            modalDescription.append(insertButton);
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
