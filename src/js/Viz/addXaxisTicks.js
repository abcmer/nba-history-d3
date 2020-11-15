Viz.prototype.addXaxisTicks = (options) => {
  const viz = this;
  const titlesToPixels = d3.scaleLinear()
    .domain([0,17])
    .range([0,viz.width - viz.graphMarginRight - viz.graphMarginLeft])

  for (i = 1; i <= 17; i++ ) {
    viz.layers.xAxisTicks[i] = viz.layers.axis
      .append('g')
      .attr('class', `xAxis${i}`)
      .attr('transform', `translate(${titlesToPixels(i)}, 0)`)  
      
    viz.layers.xAxisTicks[i]
      .append('line')
      .attr('x1', 0)
      .attr('y1', -5)
      .attr('x2', 0)
      .attr('y2', 5)
      .style('stroke', 'black')
      .style('stroke-width', 2)  
      
    viz.layers.xAxisTicks[i]
      .append('text')
      .text(i)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('y', 20)
      
  }
}