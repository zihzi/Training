import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
const rawData = await d3.csv("iris.csv");
function scatterplot(data, xInput, yInput) {
  const margin = { top: 50, bottom: 50, left: 40, right: 40 };
  const height = 600;
  const width = 800;
  const svg = d3
    .select("#container")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .attr("id", "scatterPlot");
  //x軸
  console.log(svg);
  let xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d[xInput]))
    .range([0, width - 2 * margin.left]); //domain的映射範圍,通常為畫布寬度
  let xAxis = d3.axisBottom(xScale);
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},${height - margin.bottom})`) //移動座標軸起始點
    .call(xAxis);
  //y軸
  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d[yInput]))
    .range([height - 2 * margin.top, 0]); //domain的映射範圍,通常為畫布高度
  let yAxis = d3.axisLeft(yScale);
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`) //移動座標軸起始點
    .call(yAxis);
  //顏色及圖例
  let color = d3
    .scaleOrdinal()
    .domain(["Iris-setosa", "Iris-versicolor", "Iris-virginica"])
    .range(["#a1d99b", "#ffbb78", "#6baed6"]);
  let legendArea = svg
    .append("g")
    .attr("transform", `translate(${width - 10 * margin.left},0)`);
  let legendData = ["Iris-setosa", "Iris-versicolor", "Iris-virginica"];
  let legend = legendArea
    .selectAll("g")
    .data(legendData)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return `translate(0, ${i * 15})`;
    });
  legend
    .append("circle")
    .attr("cx", `${width - 16 * margin.left}`)
    .attr("cy", 5)
    .attr("r", 4)
    .style("fill", function (d, i) {
      return color(i);
    });
  legend
    .append("text")
    .attr("x", 15)
    .attr("y", 9)
    .style("fill", function (d, i) {
      return color(i);
    })
    .text((d, i) => legendData[i])
    .attr("transform", "translate(150, 0)");
  //畫點
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d[xInput]);
    })
    .attr("cy", function (d) {
      return yScale(d[yInput]);
    })
    .attr("r", 2)
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .style("fill", function (d) {
      return color(d["class"]);
    });
}

//get select element
let mySelectXElement = document.querySelector("#xAxisOpt");
let mySelectYElement = document.querySelector("#yAxisOpt");
mySelectXElement.addEventListener("change", (_event) => {
  d3.select("#scatterPlot").remove();
  let xInput = mySelectXElement[mySelectXElement.selectedIndex].value;
  let yInput = mySelectYElement[mySelectYElement.selectedIndex].value;
  scatterplot(rawData, xInput, yInput);
});
mySelectYElement.addEventListener("change", (_event) => {
  let xInput = mySelectXElement[mySelectXElement.selectedIndex].value;
  let yInput = mySelectYElement[mySelectYElement.selectedIndex].value;
  d3.select("#scatterPlot").remove();
  scatterplot(rawData, xInput, yInput);
});
