// Fetches Portland census tracts and applies color coding based on median age
function fetchPortlandCensusTracts() {
  const queryURL =
    "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/8/query?where=STATE='41' AND COUNTY='051'&outFields=*&outSR=4326&f=geojson";

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      data.features.forEach((feature) => {
        const tractCode = feature.properties.TRACT;
        const demographicInfo = demographicDataByTract[tractCode];
        if (demographicInfo) {
          // Apply the color based on the median age
          feature.properties.medianAgeColor = getAgeColor(
            parseFloat(demographicInfo.medianAge)
          );
        } else {
          feature.properties.medianAgeColor = "#CCCCCC"; // Default color for tracts without demographic data
        }
      });

      // Add the enhanced GeoJSON data to the map
      if (map.getSource("portland-census-tracts")) {
        map.getSource("portland-census-tracts").setData(data);
      } else {
        map.addSource("portland-census-tracts", {
          type: "geojson",
          data: data,
        });
      }

      if (map.getLayer("portland-census-tracts-layer")) {
        map.removeLayer("portland-census-tracts-layer");
      }

      map.addLayer({
        id: "portland-census-tracts-layer",
        type: "fill",
        source: "portland-census-tracts",
        paint: {
          "fill-color": ["get", "medianAgeColor"],
          "fill-opacity": 0.75,
          "fill-outline-color": "#333", // Light black outline
        },
      });
    })
    .catch((error) =>
      console.error("Error fetching Portland census tracts:", error)
    );
}
