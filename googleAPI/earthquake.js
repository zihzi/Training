//read csv
const response = await fetch("earthquake.csv");
const blob = await response.blob();
const reader = new FileReader();
reader.onload = (evt) => {
  const rawData = evt.target.result;
  const row = rawData.split(/\r\n|\n/).splice(1, rawData.length - 1);
  const result = row.map((text) => {
    let value = text.split(",");
    return {
      time: value[0],
      latitude: value[1],
      longitude: value[2],
      depth: value[3],
      mag: value[4],
      magType: value[5],
      nst: value[6],
      gap: value[7],
      dmin: value[8],
      rms: value[9],
      net: value[10],
      id: value[11],
      updated: value[12],
      place: value[13],
      type: value[14],
      horizontalError: value[15],
      depthError: value[16],
      magError: value[17],
      magNst: value[18],
      status: value[19],
      locationSource: value[20],
      magSource: value[21],
    };
  });
  let map;
  async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { Marker } = await google.maps.importLibrary("marker");
    // The location of map center(茨城縣自然博物館)
    const center_position = { lat: 36.00962684865277, lng: 139.91584451570128 };
    // Initialize and add the map
    map = new Map(document.getElementById("map"), {
      zoom: 6,
      center: center_position,
      mapId: "map_seven_stars",
    });
    //set Info window to center
    let infoWindow_center = new google.maps.InfoWindow({
      content: "<h4>茨城縣自然博物館</h4>",
    });
    //Add  marker of map center
    let marker_center = new Marker({
      position: center_position,
      map: map,
    });
    marker_center.addListener("click", () => {
      infoWindow_center.open({ anchor: marker_center, map });
    });
    // Loop through the results array and place a marker for each earthquake
    for (let i = 0; i < result.length; i++) {
      const magnitude = result[i].mag;
      new Marker({
        position: new google.maps.LatLng(
          result[i].latitude,
          result[i].longitude
        ),
        icon: getCircle(magnitude),
        map: map,
      });
    }
    function getCircle(magnitude) {
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "red",
        fillOpacity: 0.2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: "white",
        strokeWeight: 0.5,
      };
    }
  }
  initMap();
};
reader.readAsText(blob);
