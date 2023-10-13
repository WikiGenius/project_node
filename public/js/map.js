function initializeMap(tour, MAPBOX_TOKEN, MAPBOX_STYLE) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  const geojson = {
    type: 'FeatureCollection',
    features: tour.locations.map(location => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: location.coordinates
      },
      properties: {
        description: location.description
      }
    }))
  };

  const map = new mapboxgl.Map({
    container: 'map',
    style: MAPBOX_STYLE,
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  geojson.features.forEach(function(marker) {
    var el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
      closeOnClick: false
    })
      .setLngLat(marker.geometry.coordinates)
      .setHTML('<p>' + marker.properties.description + '</p>')
      .addTo(map);

    bounds.extend(marker.geometry.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 50,
      right: 50
    }
  });

  map.on('load', function() {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: tour.locations.map(location => location.coordinates)
          }
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#55c57a',
        'line-opacity': 0.6,
        'line-width': 3
      }
    });
  });
}
