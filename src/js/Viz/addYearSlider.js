Viz.prototype.addYearSlider = (options) => {
  let viz = this;
  
  viz.layers.yearSlider
    .append('line')
    .attr('y1', 10)
    .attr('y2', -10)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)

  viz.layers.yearSlider
    .append('line')
    .attr('x1', 0)
    .attr('x2', viz.props.chartWidth * .9)
    .style('stroke', 'black')
    .style('stroke-width', 2)  
    
  viz.layers.yearSlider
    .append('line')
    .attr('x1', viz.props.chartWidth * .9 )
    .attr('x2', viz.props.chartWidth * .9 )
    .attr('y1', 10)
    .attr('y2', -10)   
    .attr('stroke', 'black')
    .attr('stroke-width', 2)        
    
}