Viz.prototype.addSvg = (options) => {
  const viz = this;
  viz.svg = d3.select("#container")
    .append("svg")
    .attr("width",viz.width)
    .attr("height",viz.height)
  return viz
}
