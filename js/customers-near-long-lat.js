var fs = require('fs');
var defaultReadSource = '/Users/christinebeaubrun/customers-in-Dublin/customers.text';
var customStartLatt = +process.argv[2] || 0; // string to number
var customEndLong = +process.argv[3] || 0; // string to number
var readSource = process.argv[4] || defaultReadSource;
var locateNearestCustomers = require( './locate-nearest-customers.js' );

/** Using the readFile API - Asynchronous */
fs.readFile(readSource, "utf8", function(err, data){
  if ( err ){ throw err; }
  var regex = /\n/; // newline character
  var customersData = data.split( regex );
  // console.log( Array.isArray( customersData ) );

  customersData = customersData.map(function ( str ) {
    return JSON.parse( str );
  });

  var options = {
  	startLatt: customStartLatt || 53.3381985,
  	endLong: customEndLong || -6.2592576,
  	customers: customersData,
  	desiredDistance: 100,
    sort: true,
    sortBy: 'user_id',
    format: true
  };

  var nearestCustomers = locateNearestCustomers( options );
  
  console.log( nearestCustomers );
});
