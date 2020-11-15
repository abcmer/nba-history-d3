Viz.prototype.addXaxis = (options) => {
  const viz = this;
  viz.xAxis = viz.layers.axis
    .append('line')
    .attr('x1', 5)
    .attr('y1', 0)
    .attr('x2', viz.width - viz.graphMarginRight - viz.graphMarginLeft)
    .attr('y2', 0)
    .style('stroke', 'black')
    .style('stroke-width', 2)
}