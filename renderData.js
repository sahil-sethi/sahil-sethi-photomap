	// Function to render Google map centered on Toronto
	const renderMap = () => {
		// Storing the latitude and longitude coordinates of Toronto for use in the map center and marker position properties
		const toronto = {lat: 43.6532, lng: -79.3832};
        // Create the map using the Map constructor, which takes two arguments, the map location and an object containing map options
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
           	center: toronto
        });
        // Create the marker using the Marker contructor, which takes a single argument, an object containing the marker options
        const defaultMarker = new google.maps.Marker({
            position: toronto,
            animation: google.maps.Animation.DROP,
            map,
            icon: 'mapman.png'
        });
        // Calling a function to render the rest of the map data based on the user's interaction
        renderMapData();
	};

	// Function to render the query markers and info windows, as well as to setup the event listeners
	const renderMapData = () => {
			// Returning a marker for each image in our results
			const queryMarkers = mapData.map( image => {
				return new google.maps.Marker({
	            	position: {lat: image.latitude, lng: image.longitude},
	            	map,
	            	icon: 'camera.png'
	          	});
			});
			// Returning a window for each marker with markup containing the image, the comments count, the votes count, and the photographer's name
			const queryWindows = mapData.map( image => {
	          	return new google.maps.InfoWindow({
	          		content: `
	          			<img src=${image.image_url}>
						<div class="imageData">
							<p class="comments">Comments | <strong>${image.comments_count}</strong></p>
							<p class="votes">Votes | <strong>${image.votes_count}</strong></p>
							<p class="fullname">Name | <strong>${image.full_name}</strong></p>
						</div>`
	          	});
			});
			// Event listeners for each marker to provide a hover effect
			queryMarkers.forEach( (marker, i) => {
				marker.addListener('mouseover', () => {
					queryWindows[i].open(map, marker);
				});
				marker.addListener('mouseout', () => {
					queryWindows[i].close();
				});
			});

	};


	