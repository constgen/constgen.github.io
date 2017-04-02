'use strict'

var compassElem = $('.compass')
var compassScaleElem = compassElem.find('.scale')
var directionElem = compassElem.find('.direction')
var angleElem = compassElem.find('.angle')
var DIRECTION = {
    N: 'N',
    S: 'S',
    E: 'E',
    W: 'W',
    NE: 'NE',
    NW: 'NW',
    SE: 'SE',
    SW: 'SW'
}

function setCompass(rotateAngle, motionAngle) {
    compassScaleElem.css({
        'transform': 'rotateZ('+ rotateAngle + 'deg)'
    })
    // compassElem.css({
    //     'transform': 'rotate3d(1,0,0,'+ (motionAngle * -1) +'deg)'
    // })
}

function getDirectionName(angle){
    switch (true) {
        case angle >= 315 || angle < 45:
            return DIRECTION.N
        case angle >= 45 && angle < 135:
            return DIRECTION.E
        case angle >= 135 && angle < 225:
            return DIRECTION.S
        case angle >= 225 && angle < 315:
            return DIRECTION.W
    }
}

function setDirection(angle){
    var directionName = getDirectionName(angle)
    directionElem.text(directionName)
}

function setAngle(angle){
    angle = parseInt(angle, 10)
    angleElem.text(angle)
}

$(window).on('deviceorientation', function(jqEvent){
    var event = jqEvent.originalEvent
    // console.log(event)
    // z=axis - swivel
    var alpha = event.alpha || event.webkitCompassHeading || 0
    // y-axis - yaw
    var gamma = event.gamma || 0
    // x-axis - tilt
    var beta = event.beta || 0
    // console.log(alpha, beta, gamma)
    setCompass(alpha, beta, gamma)
    setDirection(alpha, beta, gamma)
    setAngle(alpha, beta, gamma)
})   

// Prevent scrolling
$(window).on('touchstart', function(event){
    event.preventDefault()
})

// Feature detection
if (!window.DeviceOrientationEvent) {
    alert('Your device doesn\'t support compass')
}




