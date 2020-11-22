Viz.prototype.addBars = (data) => {
  let viz = this;
  data.forEach((t,idx) => {
    viz.layers.yAxisTicks[idx]
    .append('rect')
    .attr('y', -1 * (viz.props.barHeight / 2))
    .attr('x', 1)
    .attr('width', viz.titlesToPixelsScale(t.yearsWon.length))
    .attr('height', viz.props.barHeight)
    .attr('rx', "3")
    .style('fill', '#1D4289')   
    
    viz.layers.yAxisTicks[idx]
      .append('text')
      .text(t.shortName)
      // .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('x', viz.titlesToPixelsScale(t.yearsWon.length) + 2)  
      .attr('font-size', viz.props.yTickFontSize) 
      .attr('fill', 'black')     
  })
}