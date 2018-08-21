'use strict';

var ACTIVITY_TYPE = ActivitySensor.ACTIVITY_TYPE;
var activitySensor = new ActivitySensor();
activitySensor.subscribe(function (activity) {
    var activityType = activity.type;
    var text;

    switch (activityType) {
        case ACTIVITY_TYPE.IDLE:
            text = 'Device is not in hands';
            break;
        case ACTIVITY_TYPE.STANDING:
            text = 'Standing';
            break;
        case ACTIVITY_TYPE.SITTING:
            text = 'Sitting';
            break;
        case ACTIVITY_TYPE.IN_VEHICLE:
            text = 'Using as GPS in vehicle';
            break;
        case ACTIVITY_TYPE.RUNNING:
            text = 'Running';
            break;
        case ACTIVITY_TYPE.WALKING:
            text = 'Walking';
            break;
        case ACTIVITY_TYPE.LAYING:
            text = 'In a bed on the back';
            break;
        case ACTIVITY_TYPE.UNKNOWN:
            text = 'Unknown activity';
            break;
    }

    document.body.innerHTML = '<h1>' + text + '</h1>';
});