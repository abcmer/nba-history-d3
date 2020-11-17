Viz.prototype.addYearSlider = (options) => {
  let viz = this;
  
  viz.layers.yearSlider
    .append('text')
    .text('1947')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')    

  viz.layers.yearSlider
    .append('line')
    .attr('x1', 25)
    .attr('x2', viz.width - viz.chartMarginRight - viz.chartMarginLeft - 25)
    .style('stroke', 'black')
    .style('stroke-width', 2)  
    
  viz.layers.yearSlider
    .append('text')
    .text(new Date().getFullYear())
    .attr('x', viz.width - viz.chartMarginRight - viz.chartMarginLeft)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')      
    
  viz.layers.yearSlider
    .append('circle')
    .attr("cx", viz.yearsToHorizontalPixelsScale(options.year))
    .attr("r", 10)
    .style("fill", "white")
    .style("stroke-width", 3)
    .style("stroke", "black")    
}