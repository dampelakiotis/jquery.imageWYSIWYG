/*! jQuery Imagewysiwyg - v0.1.0 - 2012-11-11
* https://github.com/nickromano/jquery.imageWYSIWYG
* Copyright (c) 2012 Nick Romano; Licensed GPL */

(function($) {
    "use strict";

    var imageWYSIWYG = {
        init: function(el, config) {
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
                'class': 'images-wysiwyg-button',
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
            this.createOverlay();
            this.loadViewer(image, this.modal);
        },

        createOverlay: function() {
            this.overlay = $('<div>', {'class': 'images-wysiwyg-overlay'});
            this.modal = $('<div>', {'class': 'images-wysiwyg-modal'});
            var self = this;

            $('body').append(this.overlay)
                .append(this.modal)
                .css({'overflow-y':'hidden'});
            this.overlay.animate({'opacity':'0.6'}, 200, 'linear')
                .click(function() {
                    self.closeOverlay();
                });
        },

        closeOverlay: function() {
            var self = this;
            $(this.overlay, this.modal).animate({'opacity':'0'}, 200, 'linear', function(){
                self.overlay.remove();
                self.modal.remove();
            });
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
            
            this.addInsertButton(modalDescription, modalImage);
        },

        addInsertButton: function(modalDescription, modalImage) {
            var self = this;
            var insertButton = $('<button>', {
                text: 'Insert',
                'class': 'images-wysiwyg-button',
                click: function(e) {
                    e.preventDefault();
                    var insertImage = $('<img>', {
                        src: modalImage.attr('src'),
                        height: modalImage.css('height'),
                        width: modalImage.css('width')
                    });
                    self.$te.find('.jqte_Content').append(insertImage);
                    self.closeOverlay();
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
