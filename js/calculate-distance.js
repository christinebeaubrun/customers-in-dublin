module.exports = function ( args ) {
    var lat1 = args.lat1,
      long1 = args.long1,
      lat2 = args.lat2,
      long2 = args.long2,
      unit = args.unit || ""; // return distance in miles by default
    /*
      write test that confirms it returns distance given:
      -- lat and long
    */
    var radlat1 = Math.PI * lat1/180;
    var radlon1 = Math.PI * long1/180;

    var radlat2 = Math.PI * lat2/180;
    var radlon2 = Math.PI * long2/180;

    var theta = long1 - long2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;

    if (unit === "K") {
      dist = dist * 1.609344;
    }

    if (unit === "N") {
      dist = dist * 0.8684;
    }

    return dist;
  };