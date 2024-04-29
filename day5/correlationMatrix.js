import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
//data processing
const rawData = await d3.csv("iris.csv");
rawData.map((d) => {
  d["sepal length"] = parseFloat(d["sepal length"]);
  d["sepal width"] = parseFloat(d["sepal width"]);
  d["petal length"] = parseFloat(d["petal length"]);
  d["petal width"] = parseFloat(d["petal width"]);
});
const columnNames = rawData["columns"].filter((d) => d !== "class");
const data_setosa = rawData.filter((d) => d["class"] === "Iris-setosa");
const data_versicolor = rawData.filter((d) => d["class"] === "Iris-versicolor");
const data_virginica = rawData.filter((d) => d["class"] === "Iris-virginica");

//window setting
const width = window.innerWidth;
const height = window.innerHeight;
const svg1 = d3
  .select("#svg1")
  .attr("height", height * 0.5)
  .attr("width", width * 0.3);
const svg2 = d3
  .select("#svg2")
  .attr("height", height * 0.5)
  .attr("width", width * 0.3);
const svg3 = d3
  .select("#svg3")
  .attr("height", height * 0.5)
  .attr("width", width * 0.3);
const Lgd = d3
  .select("#Lgd")
  .attr("height", height * 0.5)
  .attr("width", width * 0.1);
const Text = d3
  .select("#Text")
  .attr("height", height * 0.2)
  .attr("width", width);
const margin = {
  top: height * 0.1,
  right: width * 0.05,
  bottom: 0,
  left: width * 0.05,
};
const Txt1 = Text.append("text")
  .text("Hover on the cell you want to compare")
  .attr("transform", `translate(${margin.left},30)`)
  .attr("alignment-baseline", "middle");

const Txt2 = Text.append("text")
  .text("")
  .attr("transform", `translate(${margin.left},60)`)
  .attr("alignment-baseline", "middle");
const Txt3 = Text.append("text")
  .text("")
  .attr("transform", `translate(${margin.left},90)`)
  .attr("alignment-baseline", "middle");
//legend
var color = d3.scaleLinear().domain([0, 0.5, 1]).range(["#fff", "#D9D2E9"]);
const Legend = () => {
  const innerW = width * 0.1 - margin.left - margin.right;
  const innerH = width * 0.3 - margin.left - margin.right;
  let colorScale = d3.scaleLinear().domain([1, 0]).range([0, innerH]);

  let yAxis = d3.axisRight().scale(colorScale).tickPadding(10);

  let G = Lgd.append("g")
    .attr("class", "y_axis")
    .call(yAxis)
    .attr(
      "transform",
      "translate(" + (innerW + margin.right / 2) + "," + margin.top + ")"
    );
  d3.selectAll("path,line").remove();

  let innercolor = d3.range(0, 1.01, 0.01);
  let h = innerH / innercolor.length + 3;
  innercolor.forEach(function (d) {
    G.append("rect")
      .style("fill", color(d))
      .style("stroke-width", 0)
      .style("stoke", "none")
      .attr("height", h)
      .attr("width", 10)
      .attr("x", 0)
      .attr("y", colorScale(d));
  });
};
//draw
const render = (canves, data, type) => {
  let corr = jz.arr.correlationMatrix(data, columnNames);
  const innerW = width * 0.3 - margin.left - margin.right;
  const innerH = width * 0.3 - margin.left - margin.right;
  const g = canves
    .append("g")
    .attr("transform", `translate(${margin.left * 2},${margin.top})`);
  let x = d3.scaleBand().domain(columnNames).range([0, innerW]);
  let y = d3.scaleBand().domain(columnNames).range([0, innerH]);
  g.append("text")
    .attr("x", innerW / 2)
    .attr("y", -15)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text(type);
  let cor = g
    .selectAll(".cor")
    .data(corr)
    .enter()
    .append("g")
    .attr("class", "cor")
    .attr("transform", function (d) {
      return `translate(${x(d.column_x)},${y(d.column_y)})`;
    })
    .on("mouseover", function (event) {
      console.log();
      d3.select(this)
        .select("rect")
        .attr("stroke", "red")
        .attr("stroke-width", 2);
      mouseover(event.target.__data__.column_x, event.target.__data__.column_y);
    })

    .on("mouseout", function (d) {
      d3.select(this).select("rect").attr("stroke", "none");
      Txt1.text("Hover on the cell you want to compare");
      Txt2.text("");
      Txt3.text("");
    });
  cor
    .append("rect")
    .attr("width", innerW / 4)
    .attr("height", innerH / 4)
    .attr("fill", (d) => color(d.correlation));
  cor
    .append("text")
    .attr("x", innerW / 8)
    .attr("y", innerH / 8)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text((d) => d.correlation.toFixed(2));
  g.append("g")
    .selectAll(".left_label")
    .data(columnNames)
    .enter()
    .append("text")
    .attr("class", "left_label")
    .attr("x", -5)
    .attr("y", (d) => y(d) + y.bandwidth() / 2)
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text((d) => d);
  g.append("g")
    .selectAll(".bottom_label")
    .data(columnNames)
    .enter()
    .append("text")
    .attr("class", "bottom_label")
    .attr("x", (d) => x(d) + x.bandwidth() / 2)
    .attr("y", innerH + 10)
    .attr(
      "transform",
      (d) => `rotate(90, ${x(d) + x.bandwidth() / 2}, ${innerH + 10})`
    )
    .text((d) => d);
};
function mouseover(x, y) {
  let corr_setosa = jz.arr.correlationMatrix(data_setosa, columnNames);
  let corr_versicolor = jz.arr.correlationMatrix(data_versicolor, columnNames);
  let corr_virginica = jz.arr.correlationMatrix(data_virginica, columnNames);
  let corr_setosa_selected = corr_setosa.find(
    (e) => e.column_x == x && e.column_y == y
  );
  let corr_versicolor_selected = corr_versicolor.find(
    (e) => e.column_x == x && e.column_y == y
  );
  let corr_virginica_selected = corr_virginica.find(
    (e) => e.column_x == x && e.column_y == y
  );
  Txt2.text(`x is :${x},y is :${y}`);
  Txt3.text(
    `The value of setosa is ${corr_setosa_selected.correlation.toFixed(
      2
    )},The value of versicolor is ${corr_versicolor_selected.correlation.toFixed(
      2
    )},The value of virginica is ${corr_virginica_selected.correlation.toFixed(
      2
    )}`
  );
}

render(svg1, data_setosa, "Iris-setosa");
render(svg2, data_versicolor, "Iris-versicolor");
render(svg3, data_virginica, "Iris-virginica");
Legend();
