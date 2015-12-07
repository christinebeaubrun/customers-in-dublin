var calculateDistance = require( './calculate-distance' );

module.exports = function ( options ) {
  /* 
    
    Takes an object with:
    -- starting latitude [ Number ]
    -- ending longitude [ Number ]
    -- customers [ Array ]
    -- desired distance [ Number ] ( OPTIONAL )

    Returns array

  */

  var defaultDistance = 5;

  var startLatt = options.startLatt,
    endLong = options.endLong,
    customers = options.customers || [],
    desiredDistance = options.desiredDistance || defaultDistance;

  var isNullUndefinedEmpty = function ( arg ) {
    return (arg === null || arg === undefined || arg === "");
  };

  if ( isNullUndefinedEmpty( startLatt ) || isNullUndefinedEmpty( endLong ) ) {
    throw new Error( 'Please provide a starting and ending latitude and longitude' );
  }

  var length = customers.length;
  if ( customers instanceof Array && length > 0 ) {
    var nearestCustomers = customers.filter( function ( customer ) {
      var customerLat = parseFloat( customer.latitude ),
        customerLong = parseFloat( customer.longitude );
      
      var args = {
        lat1: startLatt,
        long1: endLong,
        lat2: customerLat,
        long2: customerLong
      };

      return calculateDistance( args ) <= desiredDistance;
    });

    return nearestCustomers;
  }
};