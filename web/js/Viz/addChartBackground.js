Viz.prototype.addChartBackground = (options) => {
  let viz = this;
  viz.graphBackground = viz.svg
    .append('rect')
    .attr('x', viz.props.chartMarginLeft)
    .attr('y', viz.props.chartMarginUp)
    .attr('width', viz.props.width - viz.props.chartMarginRight - viz.props.chartMarginLeft)
    .attr('height', viz.props.height - viz.props.chartMarginDown - viz.props.chartMarginUp)
    .style('fill', '#ededed')
    .style('stroke', '#C40628')
    .style('stroke-width', 3)    
}