//import { groups } from "d3";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const rawData = await d3.csv("schooldata.csv");
const filtedData = rawData.filter((d) => d.rank !== "Reporter");
const schools = filtedData.map(function (d) {
  const scores_sum =
    parseFloat(d.scores_teaching) +
    parseFloat(d.scores_research) +
    parseFloat(d.scores_citations) +
    parseFloat(d.scores_industry_income) +
    parseFloat(d.scores_international_outlook);
  return {
    name: d.name,
    scores_teaching: +d.scores_teaching,
    scores_research: +d.scores_research,
    scores_citations: +d.scores_citations,
    scores_industry_income: +d.scores_industry_income,
    scores_international_outlook: +d.scores_international_outlook,
    scores_overall: scores_sum,
  };
});

//schools.sort((a, b) => b.scores_overall - a.scores_overall);

const stackBarChart = function stackBarChart(
  sortedSchools,
  sort_key,
  sort_type
) {
  let sortedData;
  if (sort_type == "Ascending") {
    sortedData = sortedSchools
      .slice()
      .sort((a, b) => d3.ascending(+a[sort_key], +b[sort_key]));
    console.log(sort_key, "asc", sortedData);
  } else {
    sortedData = sortedSchools
      .slice()
      .sort((a, b) => d3.descending(+a[sort_key], +b[sort_key]));
    console.log(sort_key, "desc", sortedData);
  }

  const subgroups = [
    "scores_teaching",
    "scores_research",
    "scores_citations",
    "scores_industry_income",
    "scores_international_outlook",
  ];
  const series = d3.stack().keys(subgroups)(sortedData);
  const width = 1000;
  const margin = {
    top: 30,
    bottom: 0,
    left: 30,
    right: 10,
  };
  const height = series[0].length * 25 + margin.top + margin.bottom;
  const x = d3.scaleLinear().domain([0, 1000]).range([margin.left, width]);
  const y = d3
    .scaleBand()
    .domain(sortedData.map((d) => d.name))
    .range([margin.top, height - margin.bottom]);
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(d3.schemeSpectral[series.length]);

  //draw
  const svg = d3.select("svg").attr("width", width).attr("height", height);
  const g = svg
    .append("g")
    .attr("id", "graph")
    .selectAll()
    .data(series)
    .join("g")
    .attr("fill", (d) => color(d.key))
    .selectAll("rect")
    .data((D) => D.map((d) => ((d.key = D.key), d)))
    .join("rect")
    .attr("x", (d) => x(d[0]))
    .attr("y", (d) => y(d.data.name))
    .attr("height", y.bandwidth() * 0.9)
    .attr("width", (d) => x(d[1]) - x(d[0]))
    .attr("transform", `translate(${margin.left * 15},${margin.top})`);

  //draw x axis
  svg
    .append("g")
    .attr("id", "x-axis-group")
    .attr("transform", `translate(${margin.left * 15},${margin.top * 1.5})`)
    .call(d3.axisTop(x).ticks(width / 50))
    .call((g) => g.selectAll(".domain").remove());
  //draw y axis
  svg
    .append("g")
    .attr("id", "y-axis-group")
    .attr("transform", `translate(${margin.left * 16},${margin.top})`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
    .call((g) => g.selectAll(".domain").remove());
  //legend
  svg
    .append("g")
    .attr("id", "legend-group")
    .selectAll("lgd")
    .data(subgroups)
    .enter()
    .append("rect")
    .attr("x", margin.left)
    .attr("y", (d, i) => margin.left * 2 + i * 25)
    .attr("height", 20)
    .attr("width", 20)
    .style("fill", (d) => color(d));
  svg
    .append("g")
    .attr("id", "legend-text")
    .selectAll("labels")
    .data(subgroups)
    .enter()
    .append("text")
    .attr("x", margin.left + 30)
    .attr("y", (d, i) => margin.left * 2 + i * 25 + 10)
    .text((d) => d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");
};

let sortIndexElement = document.querySelector("#selectScore");
let sortTypeElement = document.querySelector("#selectOrder");

sortIndexElement.addEventListener("change", (_event) => {
  let sortIndex = sortIndexElement[sortIndexElement.selectedIndex].value;
  let sortType = sortTypeElement[sortTypeElement.selectedIndex].value;
  d3.select("#graph").remove();
  d3.select("#x-axis-group").remove();
  d3.select("#y-axis-group").remove();
  d3.select("#legend-group").remove();
  d3.select("#legend-text").remove();
  stackBarChart(schools, sortIndex, sortType);
});

sortTypeElement.addEventListener("change", (_event) => {
  let sortIndex = sortIndexElement[sortIndexElement.selectedIndex].value;
  let sortType = sortTypeElement[sortTypeElement.selectedIndex].value;
  d3.select("#graph").remove();
  d3.select("#x-axis-group").remove();
  d3.select("#y-axis-group").remove();
  d3.select("#legend-group").remove();
  d3.select("#legend-text").remove();
  stackBarChart(schools, sortIndex, sortType);
});

// default is scores_sum + descending
stackBarChart(schools, "scores_overall", "Descending");
