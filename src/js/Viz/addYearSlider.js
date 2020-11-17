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
    .attr('x2', viz.width - viz.chartMarginRight - viz.chartMarginLeft)
    .style('stroke', 'black')
    .style('stroke-width', 2)  
    
  viz.layers.yearSlider
    .append('line')
    .attr('x1', viz.width - viz.chartMarginRight - viz.chartMarginLeft)
    .attr('x2', viz.width - viz.chartMarginRight - viz.chartMarginLeft)
    .attr('y1', 10)
    .attr('y2', -10)   
    .attr('stroke', 'black')
    .attr('stroke-width', 2)        
    
  // viz.layers.yearSlider
  //   .append('circle')
  //   .attr("cx", viz.yearsToHorizontalPixelsScale(options.year))
  //   .attr("r", 10)
  //   .style("fill", "white")
  //   .style("stroke-width", 3)
  //   .style("stroke", "black")    
}