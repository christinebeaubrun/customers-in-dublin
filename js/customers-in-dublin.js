var fs = require('fs');
var readSource = '/Users/christinebeaubrun/customers-in-Dublin/customers.text';
var locateNearestCustomers = require( './locate-nearest-customers.js' );

/** Using the readFile API - Asynchronous */
fs.readFile(readSource, "utf8", function(err, data){
  if ( err ){ throw err; }
  var regex = /\n/; // newline character
  var customersData = data.split( regex );

  customersData = customersData.map(function ( str ) {
    return JSON.parse( str );
  });

  var options = {
  	startLatt: 53.3381985,
  	endLong: -6.2592576,
  	customers: customersData,
  	desiredDistance: 100,
    sort: true,
    sortBy: 'user_id',
    format: true
  };

  var nearestCustomers = locateNearestCustomers( options );
  
  console.log( nearestCustomers );
});