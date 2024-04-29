let map;
async function initMap() {
    const centerposition = { lat: 35.70072, lng: 139.77322 };
    const position = [
        { lat: 35.70217, lng: 139.78584,label:"鳥越神社"},
        { lat: 35.68377, lng: 139.77850,label:"兜神社"},
        { lat: 35.68772, lng: 139.76275,label:"將門首塚"},
        { lat: 35.70272, lng: 139.76814,label:"神田明神"},
        { lat: 35.70421, lng: 139.74063,label:"築土八幡神社"},
        { lat: 35.71155, lng: 139.71538,label:"水稻荷神社"},
        { lat: 35.70474, lng: 139.69165,label:"鎧神社"}
        
    ]
    const { Map } = await google.maps.importLibrary("maps");
 //   const { AdvanceMarkerView } = await google.maps.importLibrary("marker");
    map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: centerposition,
        mapId: "Tokyo seven star",
    });
    let markers = [];
    // function addMarker(e) {
    //     markers[e] = new google.map.Marker({
    //         position: { lat: position[e].lat, lng: position[e].lng },
    //         map: map,
    //         label:position[e].label
    //     });
    // }
    // for (let i = 0; i < position.length; i++){
    //     addMarker(i);
    // }

}
initMap();
