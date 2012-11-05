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

    test('is chainable', 1, function() {
        this.elems.jqte();
        strictEqual(this.elems.imageWYSIWYG(), this.elems, 'should be chaninable');
    });

    test('loads jquery text editor', 1, function() {
        this.elems.jqte();
        ok( this.elems.parent().find('.jqte'), 'loads editor');
    });

    test('adds a button to add open the viewer', 2, function() {
        this.elems.jqte();
        this.elems.imageWYSIWYG();
        var button = this.elems.parent().find('button.addImage');
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
        var button = this.elems.parent().find('button.addImage');
        var container = this.elems.parent().find('div.images-wysiwyg-container');
        button.click();
        strictEqual( button.text(), 'Close', 'button says close');
        strictEqual( container.css('display'), 'block', 'container opens');
    });

    test('button closes container', 2, function() {
        this.elems.jqte();
        this.elems.imageWYSIWYG();
        var button = this.elems.parent().find('button.addImage');
        var container = this.elems.parent().find('div.images-wysiwyg-container');
        button.click().click();
        strictEqual( button.text(), 'Add Image', 'has the text add image');
        strictEqual( container.css('display'), 'none', 'container opens');
    });

}(jQuery));
