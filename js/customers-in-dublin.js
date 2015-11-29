var fs = require('fs');
var readSource = '/Users/christinebeaubrun/customers-in-Dublin/customers.text';
var customersNearDublinOffice = require( './locate-customers.js' );

/** Using the readFile API - Asynchronous */
fs.readFile(readSource, "utf8", function(err, data){
  if ( err ){ throw err;}
  var regex = /\n/;
  var customersData = data.split( regex );
  customersData = customersData.map(function ( str ) {
    return JSON.parse( str );
  });

  var customers = customersNearDublinOffice( customersData, "K", 100);
  console.log( customers );
});