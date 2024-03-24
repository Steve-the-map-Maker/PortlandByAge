// Base map setup
const mapStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 25,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
};
const map = new maplibregl.Map({
  container: "map", // The container ID
  style: mapStyle, // Your style object
  center: [-122.42283427563828, 45.55856459753845],
  zoom: 9.5,
});
