	// Creating global lets for the term and radius which change based on user interaction
	let map;
	let term;
	let radius;

	// Create a global empty array to store the photoData as well as a global object for the filtered data we need
	let photoData = [];
	let mapData = {};

	// Function to handle the initial user search
	const getUserSearch = e => {
		// Prevent page refresh
		e.preventDefault();
		// Setting our term query param to the value the user searched
		term = document.getElementById('userSearch').value;
		radius = document.getElementById('selectRadius').value;
		// Call the fetchPhotos function which performs our fetch using the (re)defined term and radius
		fetchPhotos();
	};