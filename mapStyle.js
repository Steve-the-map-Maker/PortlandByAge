map.on("load", function () {
  fetchPortlandCensusTracts();
  fetchACSDemographicData(); // Fetch and store ACS demographic data when the map loads
});

let demographicDataByTract = {}; // Object to store demographic data indexed by tract GEOID

// Function to classify median age into color categories
function getAgeColor(medianAge) {
  if (medianAge <= 18) return "#f2d2e9"; // Light Purple
  if (medianAge <= 30) return "#a5d8ff"; // Light Blue
  if (medianAge <= 40) return "#ffeda0"; // New Color for 31-40
  if (medianAge <= 50) return "#feb24c"; // New Color for 41-50
  if (medianAge <= 60) return "#f03b20"; // New Color for 51-60
  return "#a4d4ae"; // Light Green for 60+
}

// Wait for the map to load before fetching data
map.on("load", function () {
  fetchACSDemographicData().then(fetchPortlandCensusTracts);
});

// Add click event listener to display demographic data for a clicked tract
map.on("click", "portland-census-tracts-layer", function (e) {
  const tractCode = e.features[0].properties.TRACT;
  const data = demographicDataByTract[tractCode];

  if (data) {
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<strong>Population:</strong> ${data.population}<br><strong>Median Age:</strong> ${data.medianAge}`
      )
      .addTo(map);
  } else {
    console.log(
      "No demographic data available for this tract code:",
      tractCode
    );
  }
});
