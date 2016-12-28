'use strict'

var $ = require('jquery')

module.exports = {
    OPENNING: 'state-openning',
    OPEN: 'state-open',
    CLOSING: 'state-closing',
    CLOSED: 'state-closed',

    LINK_TAP_DELAY: 100,

    init: function (element) {
        this.element = $(element);
        this.contentElem = this.element.find('.side-content');
        this.element.after('<button class="side-navigation-control" type="button">')
        this.element.append('<button class="control-close" type="button">')
        this.openButton = this.element.next();
        this.closeButton = this.element.find('.control-close');

        this.handleTap = this.handleTap.bind(this);
        this.open = this.open.bind(this);
        this.transitionEndCallback = this.transitionEndCallback.bind(this);

        this.openButton.on('click', this.open);
        this.element.on('click', this.handleTap);
        this.element.on('touchmove', this.stopEvent);

        this.element.on('webkitTransitionEnd oTransitionEnd transitionend', this.transitionEndCallback);

        this.state = this.CLOSED;
    },

    set state(stateValue) {
        if (this._state) {
            this.element.removeClass(this._state);
        }
        this._state = stateValue;
        this.element.addClass(stateValue);
        switch (stateValue) {
            case this.CLOSED:
                break;
            case this.OPENNING:
                break;
            case this.OPEN:
                break;
            case this.CLOSING:
                break;
        }
    },

    get state() {
        return this._state;
    },

    toggle: function () {
        switch (this.state) {
            case this.CLOSED:
            case this.CLOSING:
                this.state = this.OPENNING;
                break;
            case this.OPEN:
            case this.OPENNING:
                this.state = this.CLOSING;
                break;
        }
        return this;
    },
    close: function () {
        this.state = this.CLOSING;
    },
    open: function () {
        this.state = this.OPENNING;
    },
    stopEvent: function (event) {
        event.preventDefault();
        event.stopPropagation();
    },
    handleTap: function (event) {
        var element = this.element.get(0);
        var closeButton = this.closeButton.get(0);
        if (event.target === element
            || event.target === closeButton) {
            this.close();
        }
        else if(event.target.nodeName === 'A'){
            setTimeout(this.close.bind(this), this.LINK_TAP_DELAY)
        }
    },
    transitionEndCallback: function () {
        switch (this.state) {
            case this.CLOSING:
                this.state = this.CLOSED;
                break;
            case this.OPENNING:
                this.state = this.OPEN;
                break;
        }
    }
};
