Viz.prototype.addBars = (data) => {
  let viz = this;
  data.forEach((t,idx) => {
    viz.layers.yAxisTicks[idx]
    .append('rect')
    .attr('y', '-.5rem')
    .attr('x', 1)
    .attr('width', viz.titlesToPixelsScale(t.yearsWon.length))
    .attr('height', '1rem')
    .attr('rx', "3")
    .style('fill', '#1D4289')    
  })
}