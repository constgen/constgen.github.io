'use strict';

var Flyout = require('./Flyout/flyout.js');
var $ = require('jquery');

var flyoutElements = $('[data-flyout-menu]');

flyoutElements.each(function(){
    var element = $(this);
    var title = element.text();
    var dataJSON = element.attr('data-flyout-menu');
    var data = JSON.parse(dataJSON);
    var html = '';
    html += '<nav class="flyout-menu">'
        + '<h2 class="title">'+ title +'</h2>'
        + '<ul>';
    html += data.map(function(menuItem){
        return '<li><a href="'+ menuItem.link +'" target="_blank"> ' + menuItem.label + '</a></li>';
    }).join('\n');
    html += '</ul>'
        + '</nav>';

    var flyout = new Flyout(element, html);
});