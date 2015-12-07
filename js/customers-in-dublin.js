var fs = require('fs');
var readSource = '/Users/christinebeaubrun/customers-in-Dublin/customers.text';
var locateNearestCustomers = require( './locate-nearest-customers.js' );

/** Using the readFile API - Asynchronous */
fs.readFile(readSource, "utf8", function(err, data){
  if ( err ){ throw err;}
  var regex = /\n/; // newline character
  var customersData = data.split( regex );

  customersData = customersData.map(function ( str ) {
    return JSON.parse( str );
  });

  var options = {
  	startLatt: 53.3381985,
  	endLong: -6.2592576,
  	customers: customersData,
  	desiredDistance: 100
  };

  var nearestCustomers = locateNearestCustomers( options );

  nearestCustomers.sort( function (customerA, customerB ) {
    var user_idA = customerA.user_id,
      user_idB = customerB.user_id;

    return user_idA - user_idB;
  });

  nearestCustomers.map( function ( customer ) {
    return {
      name: customer.name,
      user_id: customer.user_id
    };
  });
  
  console.log( nearestCustomers );
});