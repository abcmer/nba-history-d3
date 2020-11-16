Viz.prototype.addBars = (data) => {
  let viz = this;
  for (i=0; i < viz.teams.length; i++) {
    let team = viz.teams[i]
    let teamTitlesCount = data["2020"][team]
    viz.layers.yAxisTicks[i]
      .append('rect')
      .attr('y', -4)
      .attr('width', viz.titlesToPixelsScale(teamTitlesCount))
      .attr('height', 10)
      .style('fill', 'black')      
  }
}