import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//讀取csv
const rawData = await d3.csv("dataBarchart.csv");
const header = rawData.columns;

//找出各個地區的車站數量
const regionMap = {};
rawData.forEach((station) => {
  if (!(station["Region"] in regionMap)) {
    regionMap[station["Region"]] = parseInt(station["Station_Count"]);
  } else {
    regionMap[station["Region"]] += parseInt(station["Station_Count"]);
  }
});
let margin = { top: 20, right: 50, bottom: 20, left: 50 };
let width = 800 - margin.left - margin.right * 2;
let height = 600 - margin.bottom - margin.top;
let svg = d3
    .select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");
//畫x軸
let x = d3
  .scaleBand()
  .domain(Object.keys(regionMap))
  .range([50, width - margin.top * 8]);
svg
  .append("g")
  .attr("transform", "translate(0,500)")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");
  
// 畫y軸
let y = d3
    .scaleLinear()
    .domain([0, 40])
    .range([height - margin.top * 4, 0]); 
svg.append("g").attr("transform", "translate(50,20)").call(d3.axisLeft(y));
//畫Bar
Object.values(regionMap).forEach((value, index) => {
  let g = svg.append("g");
  let barWidth = 20;
  let x =
    index * (440 / Object.values(regionMap).length) +
    (440 / Object.values(regionMap).length / 2 -
    barWidth / 2);
  g.append("rect")
    .attr("x", x)
    .attr("y", (y(value)))
    .attr("height", height - margin.top * 4 - y(value))
    .attr("width", barWidth)
    .attr("fill", "#88aaee")
      .attr("transform", "translate(50,20)");
  g.append("text")
      .attr("x", x)
      .attr("y", (y(value)))
      .text(value)
      .attr("transform", "translate(52,20)");
    
    
});

console.log(regionMap);
