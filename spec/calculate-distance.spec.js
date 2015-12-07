var expect = require( 'chai' ).expect;
var calculateDistance = require( '../js/calculate-distance' );

// command: mocha spec/

var args = {
	lat1: 53.3381985,
	long1: -6.2592576,
	lat2: 52.986375,
	long2: -6.043701
};

var actualDistance = calculateDistance( args );
var expectedDistance = 41.67683909574448;

describe( 'calculate-distance', function () {
	it('should return distance as number', function () {
		expect( typeof actualDistance ).to.equal( 'number' );
	});

	it('should return distance between two points', function () {
		expect( actualDistance ).to.equal( expectedDistance );
	});
});
