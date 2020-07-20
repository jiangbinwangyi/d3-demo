import * as d3 from "d3";
const color = "steelblue"
const height = 500
const width = 1000
const margin = ({top: 20, right: 30, bottom: 30, left: 40})
let data = [{
    date: new Date('2017-11-5'),
    value: 10.24
}, {
    date: new Date('2017-11-6'),
    value: 95.24
}, {
    date: new Date('2017-11-7'),
    value: 10.24
}, {
    date: new Date('2017-11-8'),
    value: 90.24
}, {
    date: new Date('2017-11-9'),
    value: 10.24
}]

const line = d3.line()
    .defined(d => !isNaN(d.value))
    .x(d => x(d.date))
    .y(d => y(d.value))


let x = d3.scaleUtc()
.domain(d3.extent(data, d => d.date)) // ['2017-11-1', '2018-12-5']
.range([margin.left, width - margin.right])

let y = d3.scaleLinear()
.domain([0, d3.max(data, d => d.value)]).nice()
.range([height - margin.bottom, margin.top])
      
const xAxis = g => g
.attr("transform", `translate(0,${height - margin.bottom})`)
.call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

const yAxis = g => g
.attr("transform", `translate(${margin.left},0)`)
.call(d3.axisLeft(y))
.call(g => g.select(".domain").remove())
.call(g => g.select(".tick:last-of-type text").clone()
    .attr("x", 3)
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text(data.y))

let d3Area = d3.select("#d3-line");
const svg = d3Area.append("svg")
      .attr("viewBox", [0, 0, width, height]);

      svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
      console.log(svg.datum(data))
      export default ''
      