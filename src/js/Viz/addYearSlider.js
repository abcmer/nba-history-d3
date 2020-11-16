Viz.prototype.addYearSlider = () => {
  let viz = this;
  
  viz.layers.yearSlider
    .append('text')
    .text('1947')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')    

  viz.layers.yearSlider
    .append('line')
    .attr('x1', 20)
    .attr('x2', viz.width - viz.graphMarginRight - viz.graphMarginLeft - 20)
    .style('stroke', 'black')
    .style('stroke-width', 2)  
    
  viz.layers.yearSlider
    .append('text')
    .text('2020')
    .attr('x', viz.width - viz.graphMarginRight - viz.graphMarginLeft)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')       

}