Viz.prototype.addYearSlider = () => {
  let viz = this;
  
  viz.layers.yearSlider
    .append('text')
    .text('1947')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')    

  viz.layers.yearSlider
    .append('line')
    .attr('x1', 25)
    .attr('x2', viz.width - viz.graphMarginRight - viz.graphMarginLeft - 25)
    .style('stroke', 'black')
    .style('stroke-width', 2)  
    
  viz.layers.yearSlider
    .append('text')
    .text('2020')
    .attr('x', viz.width - viz.graphMarginRight - viz.graphMarginLeft)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')      
    
  viz.layers.yearSlider
    .append('circle')
    .attr("cx", viz.width - viz.graphMarginRight - viz.graphMarginLeft - 35 )
    .attr("r", 10)
    .style("fill", "white")
    .style("stroke-width", 3)
    .style("stroke", "black")  
    

}