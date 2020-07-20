import * as d3 from "d3";

let arr = [{id: 333}]
let arr2 = arr.length > 0 ? arr.map(e => e.id ) : ''
console.log(arr2)

let dataSet = Array(10).fill(0).map(() => Math.random() * 1000 + 50);
let width = 800;
let height = 400;
let padding = {
    x: 40,
    y: 40,
};

//位置定位
function translate (x, y) {
    return `translate(${ x.toString() }, ${ y.toString() })`;
}
//创建SVG作图区域
function addSvg () {
    let d3Area = d3.select("#d3-area");
    let svg = d3Area.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);
    console.log(svg)
    return svg;
}


//创建X轴比例尺
function createXScale () {
    let xScale = d3.scaleBand();
    xScale.domain(d3.range(dataSet.length));
    xScale.range([0, width - padding.x * 2]);
    xScale.padding(0.2);
    return xScale;
}
//创建Y轴比例尺
function createYScale () {
    let yScale = d3.scaleLinear();
    yScale.domain([0, d3.max(dataSet)]);
    yScale.nice();
    yScale.range([0, height - padding.y * 2]);
    return yScale;
}


//更新柱状图
function updateBar (g, xScale, yScale) {
    let colorOrdinal = d3.scaleOrdinal(d3.schemeCategory10);
    let rectUpdate = g.selectAll("rect").data(dataSet);
    let rectEnter = rectUpdate.enter();
    let rectExit = rectUpdate.exit();
    function setRectAttr (rects) {
        rects
            .attr("x", (d, i) => xScale(i) + padding.x)
            .attr("y", d => height - yScale(d) - padding.y)
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(d))
            .attr("fill", d => colorOrdinal(d));
    }
    setRectAttr(rectUpdate);
    let rects = rectEnter.append("rect");
    setRectAttr(rects);
    rectExit.remove();

    let textUpdate = g.selectAll("text").data(dataSet);
    let textEnter = textUpdate.enter();
    let textExit = textUpdate.exit();
    function setTextsAttr (texts) {
        texts
            .attr("x", (d, i) => xScale(i) + padding.x)
            .attr("y", d => height - yScale(d) - padding.y)
            .attr("fill", "white")
            .attr("font-size", "14px")
            .attr("dx", xScale.bandwidth() / 2)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text(d => d3.format("0.1f")(d));
    }
    setTextsAttr(textUpdate);
    let texts = textEnter.append("text");
    setTextsAttr(texts);
    textExit.remove();
}
//更新X坐标轴
function updateXAxis (g, scale) {
    let xAxis = d3.axisBottom(scale);
    g.attr("transform", translate(padding.x, height - padding.y));
    xAxis(g);
}
//更新Y坐标轴
function updateYAxis (g, scale) {
    scale.domain([d3.max(dataSet), 0]);
    scale.nice();
    let yAxis = d3.axisLeft(scale);
    g.attr("transform", translate(padding.x, padding.y));
    yAxis(g);
}


let svg = addSvg();
let gBar = svg.append("g");
let gXAxis = svg.append("g");
let gYAxis = svg.append("g");

//更新图表
function update () {
    let xScale = createXScale();
    let yScale = createYScale();
    updateBar(gBar, xScale, yScale);
    updateXAxis(gXAxis, xScale);
    updateYAxis(gYAxis, yScale);
}

update()

export default {}
