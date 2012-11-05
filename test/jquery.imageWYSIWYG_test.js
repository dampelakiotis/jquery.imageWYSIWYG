/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

    module('jQuery#imageWYSIWYG', {
        setup: function() {
            this.elems = $('textarea.image-picker');
        }
    });

    test('is available on the jquery object', 1, function() {
        ok($.fn.imageWYSIWYG, 'Should be accessible on a collection');
    });

    test('is chainable', 1, function() {
        this.elems.jqte();
        strictEqual(this.elems.imageWYSIWYG(), this.elems, 'should be chaninable');
    });

    test('offers a default object on imageWYSIWYG namespace', 1, function() {
        ok(!!$.fn.imageWYSIWYG.defaults, 'the user can change the defaults');
    });

    test('loads jquery text editor', 1, function() {
        this.elems.jqte();
        ok( this.elems.parent().find('.jqte'), 'loads editor');
    });

    test('adds a button to add open the viewer', 2, function() {
        this.elems.jqte();
        this.elems.imageWYSIWYG();
        var button = this.elems.parent().find('button.images-wysiwyg-toggle-container');
        ok( button, 'adds button');
        strictEqual( button.text(), 'Add Image', 'has the text add image');
    });

    test('adds image container', 2, function() {
        this.elems.jqte();
        this.elems.imageWYSIWYG();
        var container = this.elems.parent().find('div.images-wysiwyg-container');
        ok( container, 'adds container');
        strictEqual( container.css('display'), 'none', 'container is hidden');
    });

    test('button opens container', 2, function() {
        this.elems.jqte();
        this.elems.imageWYSIWYG();
        var button = this.elems.parent().find('button.images-wysiwyg-toggle-container');
        var container = this.elems.parent().find('div.images-wysiwyg-container');
        button.click();
        strictEqual( button.text(), 'Close', 'button says close');
        strictEqual( container.css('display'), 'block', 'container opens');
    });

    test('button closes container', 2, function() {
        this.elems.jqte();
        this.elems.imageWYSIWYG();
        var button = this.elems.parent().find('button.images-wysiwyg-toggle-container');
        var container = this.elems.parent().find('div.images-wysiwyg-container');
        button.click().click();
        strictEqual( button.text(), 'Add Image', 'has the text add image');
        strictEqual( container.css('display'), 'none', 'container opens');
    });

    test('loads images from a config array', 4, function() {
        this.elems.jqte();
        this.elems.imageWYSIWYG({
            images: [{
                    'src': 'http://www.crunchbase.com/assets/images/resized/0005/4061/54061v1-max-250x250.jpg',
                    'description': 'Apple 1'
                }, {
                    'src': 'http://blog.acorn-is.com/wp-content/uploads/apple-full2.jpg',
                    'description': 'Apple 2'
                }
            ]
        });
        var image = this.elems.parent().find('li');
        strictEqual( $(image[0]).find('img').attr('src'), 'http://www.crunchbase.com/assets/images/resized/0005/4061/54061v1-max-250x250.jpg', 'image matches config input');
        strictEqual( $(image[0]).find('p').text(), 'Apple 1', 'desciption matches config input');
        strictEqual( $(image[1]).find('img').attr('src'), 'http://blog.acorn-is.com/wp-content/uploads/apple-full2.jpg', 'image matches config input');
        strictEqual( $(image[1]).find('p').text(), 'Apple 2', 'description matches config input');
    });

    asyncTest('open image modal', 2, function() {
        this.elems.jqte();
        this.elems.imageWYSIWYG({
            images: [{
                    'src': 'http://www.crunchbase.com/assets/images/resized/0005/4061/54061v1-max-250x250.jpg',
                    'description': 'Apple 1'
                }, {
                    'src': 'http://blog.acorn-is.com/wp-content/uploads/apple-full2.jpg',
                    'description': 'Apple 2'
                }
            ]
        });
        var button = this.elems.parent().find('button.images-wysiwyg-toggle-container');
        button.click();
        var image = this.elems.parent().find('a');
        $(image[0]).click();
        $('.images-wysiwyg-modal img').load(function() {
            strictEqual( $('.images-wysiwyg-modal img').attr('src'), 'http://www.crunchbase.com/assets/images/resized/0005/4061/54061v1-max-250x250.jpg', 'shows the right image in the modal');
            $('.images-wysiwyg-overlay').click();
            setTimeout(function() {
                ok(!$('.images-wysiwyg-overlay').length, 'closed modal');
                start();
            }, 500);
        });
    });

}(jQuery));
