Viz.prototype.addAxisLines = (options) => {
  const viz = this;
  const axisLineStrokeWidth = 3
  viz.yAxis = viz.layers.axis
    .append('line')
    .attr('x1', 0)
    .attr('y1', -3)
    .attr('x2', 0)
    .attr('y2', -1 * (viz.height - viz.graphMarginUp - viz.graphMarginDown))
    .style('stroke', '#C40628')
    .style('stroke-width', axisLineStrokeWidth)

  viz.xAxis = viz.layers.axis
  .append('line')
  .attr('x1', 3)
  .attr('y1', 0)
  .attr('x2', viz.width - viz.graphMarginRight - viz.graphMarginLeft)
  .attr('y2', 0)
  .style('stroke', '#C40628')
  .style('stroke-width', axisLineStrokeWidth)    
}