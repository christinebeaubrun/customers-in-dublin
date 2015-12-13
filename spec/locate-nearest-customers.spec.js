var expect = require( 'chai' ).expect;
var locatedNearestCustomers = require( '../js/locate-nearest-customers' );
// command: mocha spec/

describe( 'located-nearest-customers', function () {
	it( 'should throw error if start latt and end long is not provided', function () {
		var options = {
		  	startLatt: '',
		  	endLong: '',
		};

		expect( function () {
			locatedNearestCustomers( options );
		} ).to.throw( 'Please provide a starting and ending latitude and longitude' );
	});

	it( 'should throw error if customer array is empty', function () {
		var options = {
		  	startLatt: 53.3381985,
		  	endLong: -6.2592576,
		  	customers: "",
		  	desiredDistance: 100
		};

		expect( function () {
			locatedNearestCustomers( options );
		}).to.throw( 'Please provide an array of customers' );
	});

	it( 'should return an array of customers based off default distance if none provided', function () {
		var customers = [
			{latitude: 52.986375, user_id: 12, name: 'Christina McArdle', longitude: -6.043701},
			{latitude: 51.92893, user_id: 1, name: 'Alice Cahill', longitude: -10.27699},
			{latitude: 51.8856167, user_id: 2, name: 'Ian McArdle', longitude: -10.4240951},
			{latitude: 52.3191841, user_id: 3, name: 'Jack Enright', longitude: -8.5072391},
			{latitude: 53.807778, user_id: 28, name: 'Charlie Halligan', longitude: -7.714444},
			{latitude: 53.4692815, user_id: 7, name: 'Frank Kehoe', longitude: -9.436036},
			{latitude: 54.0894797, user_id: 8, name: 'Eoin Ahearn', longitude: -6.18671},
			{latitude: 53.038056, user_id: 26, name: 'Stephen McArdle', longitude: -7.653889},
			{latitude: 54.1225, user_id: 27, name: 'Enid Gallagher', longitude: -8.143333}
		];

		var options = {
		  	startLatt: 53.3381985,
		  	endLong: -6.2592576,
		  	customers: customers,
		  	desiredDistance: ""
		};

		var result = locatedNearestCustomers( options );
		expect( result ).to.be.empty;
	});

	it( 'should return unsorted and unformated array of customers based off desired distance provided', function () {
		var customers = [
			{latitude: 52.986375, user_id: 12, name: 'Christina McArdle', longitude: -6.043701},
			{latitude: 51.92893, user_id: 1, name: 'Alice Cahill', longitude: -10.27699},
			{latitude: 51.8856167, user_id: 2, name: 'Ian McArdle', longitude: -10.4240951},
			{latitude: 52.3191841, user_id: 3, name: 'Jack Enright', longitude: -8.5072391},
			{latitude: 53.807778, user_id: 28, name: 'Charlie Halligan', longitude: -7.714444},
			{latitude: 53.4692815, user_id: 7, name: 'Frank Kehoe', longitude: -9.436036},
			{latitude: 54.0894797, user_id: 8, name: 'Eoin Ahearn', longitude: -6.18671},
			{latitude: 53.038056, user_id: 26, name: 'Stephen McArdle', longitude: -7.653889},
			{latitude: 54.1225, user_id: 27, name: 'Enid Gallagher', longitude: -8.143333},
			{latitude: 53.1229599, user_id: 6, name: 'Theresa Enright', longitude: -6.2705202},
			{latitude: 52.2559432, user_id: 9, name: 'Jack Dempsey', longitude: -7.1048927},
			{latitude: 52.240382, user_id: 10, name: 'Georgina Gallagher', longitude: -6.972413},
			{latitude: 53.2451022, user_id: 4, name: 'Ian Kehoe', longitude: -6.238335}
		];

		var options = {
		  	startLatt: 53.3381985,
		  	endLong: -6.2592576,
		  	customers: customers,
		  	desiredDistance: 100
		};

		var result = locatedNearestCustomers( options );

		var expectedResult = [ { latitude: 52.986375,
		    user_id: 12,
		    name: 'Christina McArdle',
		    longitude: -6.043701 },
		  { latitude: 54.0894797,
		    user_id: 8,
		    name: 'Eoin Ahearn',
		    longitude: -6.18671 },
		  { latitude: 53.038056,
		    user_id: 26,
		    name: 'Stephen McArdle',
		    longitude: -7.653889 },
		  { latitude: 53.1229599,
		    user_id: 6,
		    name: 'Theresa Enright',
		    longitude: -6.2705202 },
		  { latitude: 53.2451022,
		    user_id: 4,
		    name: 'Ian Kehoe',
		    longitude: -6.238335 } 
		    ];

		expect( result ).to.deep.equal( expectedResult );
	});

	it( 'should return formated array of customers if format property is true', function () {
		var customers = [
			{latitude: 52.986375, user_id: 12, name: 'Christina McArdle', longitude: -6.043701},
			{latitude: 51.92893, user_id: 1, name: 'Alice Cahill', longitude: -10.27699},
			{latitude: 51.8856167, user_id: 2, name: 'Ian McArdle', longitude: -10.4240951},
			{latitude: 52.3191841, user_id: 3, name: 'Jack Enright', longitude: -8.5072391},
			{latitude: 53.807778, user_id: 28, name: 'Charlie Halligan', longitude: -7.714444},
			{latitude: 53.4692815, user_id: 7, name: 'Frank Kehoe', longitude: -9.436036},
			{latitude: 54.0894797, user_id: 8, name: 'Eoin Ahearn', longitude: -6.18671},
			{latitude: 53.038056, user_id: 26, name: 'Stephen McArdle', longitude: -7.653889},
			{latitude: 54.1225, user_id: 27, name: 'Enid Gallagher', longitude: -8.143333},
			{latitude: 53.1229599, user_id: 6, name: 'Theresa Enright', longitude: -6.2705202},
			{latitude: 52.2559432, user_id: 9, name: 'Jack Dempsey', longitude: -7.1048927},
			{latitude: 52.240382, user_id: 10, name: 'Georgina Gallagher', longitude: -6.972413},
			{latitude: 53.2451022, user_id: 4, name: 'Ian Kehoe', longitude: -6.238335}
		];

		var options = {
		  	startLatt: 53.3381985,
		  	endLong: -6.2592576,
		  	customers: customers,
		  	desiredDistance: 100,
		  	format: true
		};

		var result = locatedNearestCustomers( options );

		var expectedResult = [ {
		    user_id: 12,
		    name: 'Christina McArdle' },
		  { user_id: 8,
		    name: 'Eoin Ahearn' },
		  { user_id: 26,
		    name: 'Stephen McArdle' },
		  { user_id: 6,
		    name: 'Theresa Enright' },
		  { user_id: 4,
		    name: 'Ian Kehoe' } 
		    ];

		expect( result ).to.deep.equal( expectedResult );
	});

	it( 'should return sorted array of customers if sortStatus is true and sortBy property is provided', function () {
		var customers = [
			{latitude: 52.986375, user_id: 12, name: 'Christina McArdle', longitude: -6.043701},
			{latitude: 51.92893, user_id: 1, name: 'Alice Cahill', longitude: -10.27699},
			{latitude: 51.8856167, user_id: 2, name: 'Ian McArdle', longitude: -10.4240951},
			{latitude: 52.3191841, user_id: 3, name: 'Jack Enright', longitude: -8.5072391},
			{latitude: 53.807778, user_id: 28, name: 'Charlie Halligan', longitude: -7.714444},
			{latitude: 53.4692815, user_id: 7, name: 'Frank Kehoe', longitude: -9.436036},
			{latitude: 54.0894797, user_id: 8, name: 'Eoin Ahearn', longitude: -6.18671},
			{latitude: 53.038056, user_id: 26, name: 'Stephen McArdle', longitude: -7.653889},
			{latitude: 54.1225, user_id: 27, name: 'Enid Gallagher', longitude: -8.143333},
			{latitude: 53.1229599, user_id: 6, name: 'Theresa Enright', longitude: -6.2705202},
			{latitude: 52.2559432, user_id: 9, name: 'Jack Dempsey', longitude: -7.1048927},
			{latitude: 52.240382, user_id: 10, name: 'Georgina Gallagher', longitude: -6.972413},
			{latitude: 53.2451022, user_id: 4, name: 'Ian Kehoe', longitude: -6.238335}
		];

		var options = {
		  	startLatt: 53.3381985,
		  	endLong: -6.2592576,
		  	customers: customers,
		  	desiredDistance: 100,
		  	format: true,
		  	sortStatus: true,
		  	sortBy: 'user_id'
		};

		var result = locatedNearestCustomers( options );

		var expectedResult = [ 
			{ user_id: 4,
			  name: 'Ian Kehoe' },
			{ user_id: 6,
			  name: 'Theresa Enright' },
			{ user_id: 8,
			  name: 'Eoin Ahearn' },
			{ user_id: 12,
			  name: 'Christina McArdle' },
			{ user_id: 26,
			  name: 'Stephen McArdle' }
		];
		
		expect( result ).to.deep.equal( expectedResult );
	});
});