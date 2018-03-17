const events = require('events');
const gmap = require('@google/maps');

const GOOGLE_MAP_API_KEY = 'AIzaSyBzp90bcrDF9Tq78iptvJDBcm3fnAFF-PQ';
const googleMapsClient = gmap.createClient({
  key: GOOGLE_MAP_API_KEY
});

module.exports = paths => {
  const formattedPaths = paths.map(x => `${x[0]}, ${x[1]}`);
  const event = new events.EventEmitter();
  googleMapsClient.distanceMatrix({
    origins: formattedPaths[0],
    destinations: formattedPaths
  }, (err, res) => {
    if (!err) {
      for(let row of res.json.rows) {
        for(let element of row.elements) {
          if(element.status !== 'OK') {
            event.emit('error', res.json);
            return;
          }
        }
      }
      
      const distances = res.json.rows[0].elements.map(x => x.distance.value);
      const durations = res.json.rows[0].elements.map(x => x.duration.value);
      event.emit('success', {
        paths: paths,
        total_distance: distances.reduce((a, b) => a + b, 0),
        total_duration: durations.reduce((a, b) => a + b, 0),
        status: 'success'
      });
    } else {
      event.emit('error', err);
    }
  });
  return event;
}