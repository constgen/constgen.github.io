var ACTIVITY_TYPE = ActivitySensor.ACTIVITY_TYPE;
var activitySensor = new ActivitySensor();
activitySensor.subscribe(function (activity) {
	var activityType = activity.type;
	var text;

	switch (activityType) {
		case 'Idle':
			text = 'Device is not in hands';
			break;
		case 'Fidgeting':
			text = 'Using device';
			break;
		case 'InVehicle':
			text = 'Using as GPS in vehicle';
			break;
		case 'Running':
			text = 'Running';
			break;
		case 'Stationary':
			text = 'Staying still';
			break;
		case 'Walking':
			text = 'Walking';
			break;
		case 'Laying':
			text = 'In a bed on the back';
			break;
		case 'Unknown':
			text = 'Unknown activity';
			break;
	}
	document.body.innerHTML = '<h1>' + text + '</h1>';
});