'use strict';

var Slider = require('./slider.component.js');
var $ = require('jquery');

$(function(){
    $('.component-slider').each(function () {
        new Slider(this);
    });
})

