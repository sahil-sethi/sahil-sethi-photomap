	// Function to fetch our photos, adding the query as the final piece of our URL
	const fetchPhotos = () => {
		// Creating constants for the URL, photo search resource path, consumer key, and the latlng portion of the geo query param
		const baseUrl = 'https://api.500px.com/v1/';
		const photoSearchUrl = 'photos/search';
		const consumerKey = 'SIwRLq0AwiEydJeCT8NLk3chVNyEMgweH52bQVx5';
		const latLng = '43.6532,-79.3832,';
		// Using template literals to build out the URL argument that fetch requires
		fetch(`${baseUrl}${photoSearchUrl}?consumer_key=${consumerKey}&term=${term}&geo=${latLng}${radius}`)
			// .then block to return the JSON value of our fetch call's response
		  	.then(response => response.json())
		  	// . then block to 
		  	.then(data => {
		  		// Storing the photos array from our response into our empty photoData array
		  		photoData = data.photos;
		  		// Storing the returned filtered data we require for our map into mapData
		  		mapData = getMapData();
		  		console.log(mapData);
		  		// Render out the Google map
		  		renderMap();
		  	// Have a catch all at the bottom of our fetch call to discover potential errors
		  	}).catch(alert);
	};

	// Function to get the specific display data required
	const getMapData = () => {
		// Using map and object destructuring to return the data points we require, including the latitude and longitude coordinates
		return photoData.map( photo => {
			const {
				image_url,
				comments_count,
				votes_count,
				full_name = photo.user.fullname,
				latitude,
				longitude
			} = photo;
			return {
				image_url,
				comments_count,
				votes_count,
				full_name,
				latitude,
				longitude
			};
		});
	};
