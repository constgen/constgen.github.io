'use strict';

var activitySensor = new ActivitySensor();
activitySensor.subscribe(function () {
    var text;
    var movement = activitySensor.movement;
    movement = typeof movement === 'string' ? [0, 0, movement] : movement;
    text = 'horizontal: ' + movement[0].toFixed(2)
        + '<br> vertical: ' + movement[1].toFixed(2)
        + '<br> movement: ' + movement[2];
    document.body.innerHTML = '<h1>' + text + '</h1>';
});
