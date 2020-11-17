Viz.prototype.addYaxisTicks = (data) => {
  const viz = this;
  const teams = data.map(t => t.shortName)
  const teamIndexToPixels = d3.scaleLinear()
    .domain([0,teams.length])
    .range([0,viz.height - viz.graphMarginUp - viz.graphMarginDown - 10])

  for (i=0; i < teams.length; i++ )   {
    viz.layers.yAxisTicks[i] = viz.layers.axis
      .append('g')
      .attr('class', `yAxis${i}`)
      .attr('transform', `translate(0, -${teamIndexToPixels(i+1)})`)  
            
    viz.layers.yAxisTicks[i]
      .append('text')
      .text(teams[i])
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('x', -5)      
  }
}