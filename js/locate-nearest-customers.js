var calculateDistance = require( './calculate-distance' );

module.exports = function ( options ) {
  /* 
    
    Takes an object with:
    -- starting latitude [ Number ]
    -- ending longitude [ Number ]
    -- customers [ Array ]
    -- desired distance [ Number ] ( OPTIONAL )
    -- sortStatus [ Boolean ] ( OPTIONAL )
    -- sortBy [ String ] ( OPTIONAL )
    -- format [ String ] ( OPTIONAL )
    Returns array

  */

  var defaultDistance = 5;

  var startLatt = options.startLatt,
    endLong = options.endLong,
    customers = options.customers || [],
    desiredDistance = options.desiredDistance || defaultDistance,
    format = options.format || false,
    sortStatus = options.sortStatus || false,
    sortBy = options.sortBy || '';

  var isNullUndefinedEmpty = function ( arg ) {
    return (arg === null || arg === undefined || arg === "");
  };

  var length = customers.length;

  if ( isNullUndefinedEmpty( startLatt ) || isNullUndefinedEmpty( endLong ) ) {
    throw new Error( 'Please provide a starting and ending latitude and longitude' );
  }

  if ( length === 0 ) {
    throw new Error( 'Please provide an array of customers' );
  }

  var nearestCustomers = [];
  customers.forEach( function ( customer ) {
    var customerLat = parseFloat( customer.latitude ),
      customerLong = parseFloat( customer.longitude );
    
    var args = {
      lat1: startLatt,
      long1: endLong,
      lat2: customerLat,
      long2: customerLong
    };

    if ( calculateDistance( args ) <= desiredDistance ) {
      if ( format ) {
        nearestCustomers.push({
          name: customer.name,
          user_id: customer.user_id
        });
      } else {
        nearestCustomers.push( customer );
      }
    }
  });

  if ( sortStatus && sortBy ) {
    return nearestCustomers.sort( function (customerA, customerB ) {
      var user_idA = customerA[ sortBy ],
        user_idB = customerB[ sortBy ];

      return user_idA - user_idB;
    });
  } else {
    return nearestCustomers;
  }
};