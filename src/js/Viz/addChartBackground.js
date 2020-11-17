Viz.prototype.addChartBackground = (options) => {
  let viz = this;
  viz.graphBackground = viz.svg
    .append('rect')
    .attr('x', viz.chartMarginLeft)
    .attr('y', viz.chartMarginUp)
    .attr('width', viz.width - viz.chartMarginRight - viz.chartMarginLeft)
    .attr('height', viz.height - viz.chartMarginDown - viz.chartMarginUp)
    .style('fill', '#ededed')
    .style('stroke', '#C40628')
    .style('stroke-width', 3)    
}