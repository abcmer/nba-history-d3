Viz.prototype.addYaxisTicks = (options) => {
  const viz = this;
  const teams = ['Lakers', 'Celtics', 'Warriors', 'Bulls', 'Spurs', '76ers', 'Pistons', 'Heat', 'Knicks', 'Rockets', 'Caveliers', 'Hawks', 'Bullets', 'SuperSonics', 'Trail Blazers', 'Bucks', 'Mavericks', 'Royals', 'Raptors']
  const teamIndexToPixels = d3.scaleLinear()
    .domain([0,teams.length])
    .range([0,viz.height - 80])

  for (i=0; i < teams.length; i++ )   {
    viz.layers.yAxisTicks[i] = viz.layers.axis
      .append('g')
      .attr('class', `yAxis${i}`)
      .attr('transform', `translate(0, -${teamIndexToPixels(i+1)})`)  
      
    viz.layers.yAxisTicks[i]
      .append('line')
      .attr('x1', -5)
      .attr('y1', 0)
      .attr('x2', 5)
      .attr('y2', 0)
      .style('stroke', 'black')
      .style('stroke-width', 2)  
      
    viz.layers.yAxisTicks[i]
      .append('text')
      .text(teams[i])
      .attr('text-anchor', 'end')
      .attr('alignment-baseline', 'middle')
      .attr('x', -12)
       
    console.log(i, teamIndexToPixels(i))
  }
}