'use strict'

var $ = require('jquery');
var flyoutWindow = require('./flyout-window.js');
var throttle  = require('throttle-debounce').throttle;

function noop (){}

function Flyout(element, htmlContent){
    this.element = $(element);
    this.content = $(htmlContent);
    this.element.on('click', this.handleCLick.bind(this));
    this.definePosition = throttle(60, true, this.definePosition.bind(this));
}

Flyout.prototype.handleCLick = function(event){
    this.show();
    return false;
}

Flyout.prototype.definePosition = function(event){
    var elementOffset = this.element.offset();
    var elementWidth = this.element.width();
    var elementHeight = this.element.height();
    var position;
    //var menuHeight = flyoutWindow.getHeight();
    // var pageHeight = $(document).height();
    // var pageOffset = $(window).scrollTop();
    //if (1) {
        position = {
            top: elementOffset.top + elementHeight,
            left: elementOffset.left + elementWidth / 2
        };
        flyoutWindow.element.css(position);
        flyoutWindow.setBottom();
    // }
    // else {
    //     position = {
    //         top: elementOffset.top - menuHeight,
    //         left: elementOffset.left + elementWidth / 2
    //     };
    //     flyoutWindow.element.css(position);
    //     flyoutWindow.setTop();
    // }
    //console.log(elementPosition)
    //console.log(elementOffset, 'menuHeight', menuHeight)
}

Flyout.prototype.startListeners = function(){
    var hide = this.hide.bind(this)
    flyoutWindow.closeButton.one('click.flyout', hide);
    $(document).one('click.flyout', hide);
    $(window).on('resize.flyout', this.definePosition);
    flyoutWindow.element.one('click.flyout', noop);
}

Flyout.prototype.stopListeners = function(){
    flyoutWindow.closeButton.off('click.flyout');
    flyoutWindow.element.off('click.flyout');
    $(document).off('click.flyout');
    $(window).off('resize.flyout');
}

Flyout.prototype.show = function(){
    this.startListeners();
    flyoutWindow.content.empty();
    flyoutWindow.content.append(this.content);
    this.definePosition();
    flyoutWindow.show();
    //this.definePosition();
}

Flyout.prototype.hide = function(){
    //console.warn('hide')
    this.stopListeners();
    flyoutWindow.hide();
    flyoutWindow.element.css({left: '', top: ''});
    flyoutWindow.content.empty();
    //console.log(flyoutWindow.content)
}

module.exports = Flyout;