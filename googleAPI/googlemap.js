let map;
let markers_stars = [];
let infoWindow_stars = [];
let markers_square = [];
let infoWindow_square = [];
let info_stars = [
  "<h4>鎧神社</h4>",
  "<h4>水稻荷神社</h4>",
  "<h4>築土八幡神社</h4>",
  "<h4>神田明神</h4>",
  "<h4>將門首塚</h4>",
  "<h4>兜神社</h4>",
  "<h4>鳥越神社</h4>",
];
let info_square = [
  "<h4>雜司之谷靈園</h4>",
  "<h4>青山靈園</h4>",
  "<h4>築地本願寺</h4>",
  "<h4>谷中靈園</h4>",
];
async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { Marker } = await google.maps.importLibrary("marker");
  // The location of map center(靖國神社)
  const center_position = { lat: 35.69430145539894, lng: 139.74389726096416 };
  //The location of stars
  const stars_position = [
    { lat: 35.704640595366676, lng: 139.691639371164 },
    { lat: 35.71164009008594, lng: 139.71538841440662 },
    { lat: 35.70477353525238, lng: 139.74062220190157 },
    { lat: 35.70214925982775, lng: 139.76790502604572 },
    { lat: 35.6875129965646, lng: 139.76274089720928 },
    { lat: 35.68373216411201, lng: 139.77851683953693 },
    { lat: 35.702156384797064, lng: 139.7859458144063 },
  ];
  //The location of square
  const square_position = [
    { lat: 35.7228852383426, lng: 139.71938428371618 },
    { lat: 35.66578456881095, lng: 139.72208735487814 },
    { lat: 35.66668664888322, lng: 139.77235869905843 },
    { lat: 35.7241176036257, lng: 139.770277639536 },
  ];
  // Initialize and add the map
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: center_position,
    mapId: "map_seven_stars",
  });
  //set Info window to center
  let infoWindow_center = new google.maps.InfoWindow({
    content: "<h4>靖國神社</h4>",
  });
  //Add  marker of map center
  let marker_center = new Marker({
    position: center_position,
    map: map,
  });
  marker_center.addListener("click", () => {
    infoWindow_center.open({ anchor: marker_center, map });
  });
  //set Info window to star_markers
  info_stars.forEach((title, i) => {
    infoWindow_stars[i] = new google.maps.InfoWindow({
      content: title,
    });
  });
  // Add markers of stars
  for (let i = 0; i < stars_position.length; i++) {
    markers_stars[i] = new Marker({
      position: {
        lat: stars_position[i].lat,
        lng: stars_position[i].lng,
      },
      map: map,
    });
    markers_stars[i].addListener("click", () => {
      infoWindow_stars[i].open({ anchor: markers_stars[i], map });
    });
  }
  //draw polyline
  let polyline = new google.maps.Polyline({
    path: stars_position,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeWeight: 5,
  });
  polyline.setMap(map);
  //set Info window to square_markers
  info_square.forEach((title, i) => {
    infoWindow_square[i] = new google.maps.InfoWindow({
      content: title,
    });
  });
  // Add markers of square
  for (let i = 0; i < square_position.length; i++) {
    markers_square[i] = new Marker({
      position: {
        lat: square_position[i].lat,
        lng: square_position[i].lng,
      },
      map: map,
    });
    markers_square[i].addListener("click", () => {
      infoWindow_square[i].open({ anchor: markers_square[i], map });
    });
  }
  //draw polygon
  let polygon = new google.maps.Polygon({
    path: square_position,
    strokeColor: "#f1c40f",
    strokeWeight: 4,
    fillColor: "#f1c40f",
    fillOpacity: 0.25,
  });
  polygon.setMap(map);
  //draw cross polyline in the polygon
  let cross_polyline = new google.maps.Polyline({
    path: [
      { lat: 35.7228852383426, lng: 139.71938428371618 },
      { lat: 35.66668664888322, lng: 139.77235869905843 },
      { lat: 35.66578456881095, lng: 139.72208735487814 },
      { lat: 35.7241176036257, lng: 139.770277639536 },
    ],
    strokeColor: "#f1c40f",
    strokeWeight: 4,
  });
  cross_polyline.setMap(map);
}

initMap();
