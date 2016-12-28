'use strict';
var Swiper = require('swiper')
var $ = require('jquery')

function Slider(elem, options) {
    var component = this
    this.sliderElem = $(elem).eq(0)
    this.sliderContainerElem = this.sliderElem.find('.slider-container')
    this.length = this.sliderElem.find('.slide').length

    if (this.length <= 1) {
        return this
    }

    var attributes = this.sliderElem.data()
    if ('pagination' in attributes) {
        this.injectPaginationControls()
    }
    if ('navigationArrows' in attributes) {
        this.injectArrowsnControls()
    }

    if (this.sliderElem.find('.slider-thumbnails').length) {
        this.sliderElem.addClass('with-thumbnails')
    }

    this.paginationElem = this.sliderElem.find('.slider-pagination')
    this.nextControl = this.sliderElem.find('.slider-nav-next')
    this.prevControl = this.sliderElem.find('.slider-nav-prev')
    this.thumbsContainerElem = this.sliderElem.find('.slider-thumbnails')
    this.thumbNavigationItems = this.thumbsContainerElem.find('.thumbnail-navigation-item')
    
    this.handleSlideChanged = this.handleSlideChanged.bind(this)
    this.thumbClicked = this.thumbClicked.bind(this)

    this.swiper = new Swiper(this.sliderContainerElem, {
        direction: 'horizontal',
        loop: true,
        //zoom: true,
        keyboardControl: true,
        paginationClickable: true,
        //grabCursor: true,
        centeredSlides: true,
        //slideToClickedSlide: true,
        autoplay: 4000,
        speed: 450,
        //autoplayStopOnLast: true,
        autoplayDisableOnInteraction: true,
        effect: 'slide', //"slide", "fade", "cube", "coverflow" "flip"

        // If we need pagination
        pagination: this.paginationElem,
        paginationBulletRender: this.renderPaginationItem,

        // Navigation arrows
        nextButton: this.nextControl,
        prevButton: this.prevControl
    })

    // Thumbnail functionality
    if (this.thumbsContainerElem.length) {
        this.handleSlideChanged(this.swiper)
        this.thumbNavigationItems.on('click', this.thumbClicked)
        this.swiper.on('onTransitionEnd', this.handleSlideChanged)
    }
}

Slider.prototype.ACTIVE_CLASSNAME = 'current'

Slider.prototype.renderPaginationItem = function (swiper, index, className) {
    return '<span class="slider-pagination-item ' + className + '"></span>'
}

Slider.prototype.injectPaginationControls = function () {
    this.sliderElem.append('<div class="swiper-pagination slider-pagination"></div>')
}
Slider.prototype.injectArrowsnControls = function () {
    this.sliderContainerElem.append('<div class="slider-nav-prev"></div><div class="slider-nav-next"></div>')
}

Slider.prototype.handleSlideChanged = function (slider) {
    var slideIndex = slider.realIndex
    this.setThumbIndex(slideIndex)
}

Slider.prototype.thumbClicked = function (event) {
    var thumbIndex = $(event.currentTarget).index()
    this.slideTo(thumbIndex)
}

Slider.prototype.setThumbIndex = function (index) {
    this.thumbNavigationItems.removeClass(this.ACTIVE_CLASSNAME)
    this.thumbNavigationItems.eq(index).addClass(this.ACTIVE_CLASSNAME)
}

Slider.prototype.slideTo = function (index) {
    var length = this.length
    var realIndex = this.swiper.realIndex
    var activeIndex = this.swiper.activeIndex
    var slideIndex = activeIndex - realIndex + index

    if (slideIndex > length) {
        slideIndex = slideIndex - length
    }

    this.swiper.slideTo(slideIndex)
}

module.exports = Slider