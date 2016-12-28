'use strict';

var $ = require('jquery');

var containerElem = $(
    '<div class="flyout-window">'
        + '<div class="window">'
            + '<button class="control-close"></button>'
            + '<div class="flyout-content"></div>'
        + '</div>'
    + '</div>'
)
var flyoutWndow = {
    VISIBILITY_CLASS: 'visible',
    TOP_POSITION_CLASS: 'top',
    BOTTOM_POSITION_CLASS: 'bottom',
    element: containerElem,
    windowElement:  containerElem.find('.window'),
    content: containerElem.find('.flyout-content'),
    closeButton: containerElem.find('.control-close'),
    show: function(){
        this.element.addClass(this.VISIBILITY_CLASS);
    },
    hide: function(){
        this.element.removeClass(this.VISIBILITY_CLASS);
    },
    setTop: function(){
        this.element.addClass(this.TOP_POSITION_CLASS);
        this.element.removeClass(this.BOTTOM_POSITION_CLASS);
    },
    setBottom: function(){
        this.element.removeClass(this.TOP_POSITION_CLASS);
        this.element.addClass(this.BOTTOM_POSITION_CLASS);
    },
    getHeight: function(){
        return this.windowElement.height();
    }
}

$(function(){
    flyoutWndow.hide = flyoutWndow.hide.bind(flyoutWndow)
    $(document.body).append(flyoutWndow.element);
    flyoutWndow.windowElement.on('click', function(event){
        event.stopPropagation();
    });
    flyoutWndow.element.on('touchmove', function(event){
        if (event.target === this) {
            event.preventDefault();
        }
    });
});

module.exports = flyoutWndow;




