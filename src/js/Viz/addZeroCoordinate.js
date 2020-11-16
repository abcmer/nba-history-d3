Viz.prototype.addZeroCoordinate = (options) => {
  const viz = this;
  viz.xAxis = viz.layers.axis
    .append('circle')
    .attr("cx", 0 )
    .attr("cy", 0 )
    .attr("r", 2)
    .style("fill", "black")
    .style("stroke-width", 3)
    .style("stroke", "black")
}