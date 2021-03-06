Viz.prototype.addYaxisTicks = (data) => {
  const viz = this;
  const teams = data.map(t => t.shortName)
  const teamIndexToPixels = d3.scaleLinear()
    .domain([0,teams.length + 1])
    .range([0,(viz.props.height - viz.props.chartMarginUp - viz.props.chartMarginDown)*(teams.length / 20)])

  for (i=0; i < teams.length; i++ )   {
    viz.layers.yAxisTicks[i] = viz.layers.axis
      .append('g')
      .attr('class', `yAxis${i}`)
      .attr('transform', `translate(0, -${teamIndexToPixels(i+1)})`)  
            
    // viz.layers.yAxisTicks[i]
    //   .append('text')
    //   .text(teams[i])
    //   .attr('text-anchor', 'end')
    //   .attr('dominant-baseline', 'middle')
    //   .attr('x', 20)  
    //   .attr('font-size', viz.props.yTickFontSize)    
  }
}