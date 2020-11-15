Viz.prototype.addYaxis = (options) => {
  const viz = this;
  viz.yAxis = viz.layers.axis
    .append('line')
    .attr('x1', 0)
    .attr('y1', -5)
    .attr('x2', 0)
    .attr('y2', -1 * (viz.height - 80))
    .style('stroke', 'black')
    .style('stroke-width', 2)
}