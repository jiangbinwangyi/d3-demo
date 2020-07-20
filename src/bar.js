import * as d3 from "d3";
const color = "steelblue"
const height = 500
const width = 1000
const margin = ({top: 30, right: 0, bottom: 30, left: 40})
const data = [{
    name: 'A',
    value: 123
}, {
    name: 'B',
    value: 146
}, {
    name: 'C',
    value: 178
}]


let x = d3.scaleBand()
.domain(d3.range(data.length)) // [0,1,2,3,...10]
.range([margin.left, width - margin.right])
.padding(0.1)

let y = d3.scaleLinear()
.domain([0, d3.max(data, d => d.value)]).nice()
.range([height - margin.bottom, margin.top])
      
const xAxis = g => g
.attr("transform", `translate(0,${height - margin.bottom})`)
.call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0))  

const yAxis = g => g
.attr("transform", `translate(${margin.left},0)`)
.call(d3.axisLeft(y).ticks(null, data.format))
.call(g => g.select(".domain").remove())
.call(g => g.append("text")
.attr("x", -margin.left)
.attr("y", 10)
.attr("fill", "currentColor")
.attr("text-anchor", "start")
.text(data.y)) 

let d3Area = d3.select("#d3-bar");
const svg = d3Area.append("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);
      
      export default ''
      