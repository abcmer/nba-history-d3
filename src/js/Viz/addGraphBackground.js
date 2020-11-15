Viz.prototype.addGraphBackground = (options) => {
  let viz = this;
  viz.graphBackground = viz.svg
    .append('rect')
    .attr('x', viz.graphMarginLeft)
    .attr('y', viz.graphMarginUp)
    .attr('width', viz.width - viz.graphMarginRight - viz.graphMarginLeft)
    .attr('height', viz.height - viz.graphMarginDown - viz.graphMarginUp)
    .style('fill', '#ededed')
}