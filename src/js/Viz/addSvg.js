Viz.prototype.addSvg = (options) => {
  const viz = this;

  viz.svg = d3.select("#container")
    .selectAll("*").remove()

  viz.svg = d3.select("#container")
    .append("svg")
    .attr("width",viz.props.width)
    .attr("height",viz.props.height)
  return viz
}
