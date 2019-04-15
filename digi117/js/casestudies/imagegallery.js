//Image gallery in Case studies

;(function(window, document, $){

	$(document).ready(function() {
		$(".imagegallery").waterwheelCarousel({
			startingWaveSeparation: -90,
			waveSeparationFactor: .7,
			centerOffset: 10,
			startingItemSeparation: 120,
			itemSeparationFactor: .9,
			itemDecreaseFactor: .75,
			
			startingItemSeparation: 200,
			startingWaveSeparation: -200,
			waveSeparationFactor: 0.5,
			itemDecreaseFactor: 0.5,
			opacityDecreaseFactor: 0.7
		});
	});

}(window, document, jQuery))