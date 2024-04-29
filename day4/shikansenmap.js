import geoData from "./rstatp_jpn.json" assert { type: "json" };

//讀取csv
const response = await fetch("data.csv");
const blob = await response.blob();
const reader = new FileReader();
reader.onload = (evt) => {
  const rawData = evt.target.result;
  const row = rawData.split(/\r\n|\n/).splice(1, rawData.length - 1);

  const result = row.map((text) => {
    let value = text.split(",");

    return {
      station_name: value[0],
      shinkansen_line: value[1],
      year: value[2],
      prefecture: value[3],
      distance_from_tokyo_st: value[4],
      Company: value[5],
    };
  });
  console.log(result);
  //找出有新幹線的行政區
  const allPrefecture = Array.from(
    new Set(
      result.map((obj1) => {
        return obj1["prefecture"];
      })
    )
  );

  //找出九州的新幹線按照與東京站的距離排序
  const KyushuShinkansen = result
    .sort((a, b) => b["distance_from_tokyo_st"] - a["distance_from_tokyo_st"])
    .filter((obj2) => {
      return obj2["shinkansen_line"] == "Kyushu_Shinkansen";
    });

  //將station_name按照他們的company分類
  let CompanyMap = {};
  result.forEach((row) => {
    if (!(row["Company"] in CompanyMap)) {
      let initStation = [];
      initStation.push(row["station_name"]);
      CompanyMap[row["Company"]] = {
        station_count: 1,
        stations: initStation,
      };
    } else {
      CompanyMap[row["Company"]]["station_count"]++;
      CompanyMap[row["Company"]]["stations"].push(row["station_name"]);
    }
  });
  //把站名加上座標
  let matchName = [];
  geoData["features"].forEach((featuresArrObj) => {
    result.forEach((row) => {
      if (
        row["station_name"].toUpperCase().replace("-", "") ==
        featuresArrObj["properties"]["nam"]
      ) {
        row["coordinates"] = featuresArrObj["geometry"]["coordinates"];
        matchName.push(row);
      }
    });
  });
  //在地圖上顯示車站座標
  const map = L.map("map").setView([36.67526626586909, 136.76519775390602], 6);

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  matchName.forEach((stationObj) => {
    let lat = stationObj["coordinates"].reverse()[0];
    let lng = stationObj["coordinates"][1];
    let marker = new L.marker([lat, lng]).addTo(map).bindPopup("Station Name: "+stationObj["station_name"]);
  });



  //console.log(matchName);
};
reader.readAsText(blob);
