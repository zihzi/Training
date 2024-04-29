import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//讀取csv
const rawData = await d3.csv("data.csv");
const header = rawData.columns;

//找出各個都道府縣的車站數量
const companyMap = {};
rawData.forEach((station) => {
  if (!(station["Company"] in companyMap)) {
    companyMap[station["Company"]] = 1;
  } else {
    companyMap[station["Company"]]++;
  }
});

let width = 800;
let height = 600;
let svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
let color = d3.scaleOrdinal().range(d3.schemePastel2);

//生成可以計算arc的東西
let pieGenerator = d3.pie().value(function (d) {
  return d[1];
});

//綁定data計算出角度
const arcs = pieGenerator(Object.entries(companyMap));
// 依照計算的角度生成arc
const arcGenerator = d3.arc().innerRadius(0).outerRadius(100);
svg
  .selectAll("mySlices")
  .data(arcs)
  .join("path")
  .attr("d", arcGenerator)
  .attr("fill", function (d) {
    return color(d.data[0]);
  })
  .attr("stroke", "grey")
  .style("stroke-width", "2px")
  .style("opacity", 0.7);

svg
  .selectAll("mySlices1")
  .data(arcs)
  .join("text")
  .text(function (d) {
    return d.data[0];
  })
  .attr("transform", function (d) {
    return `translate(${arcGenerator.centroid(d)})`;
  })
  .style("text-anchor", "middle")
  .style("font-size", 10);

   
  