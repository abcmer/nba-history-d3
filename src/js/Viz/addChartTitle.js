Viz.prototype.addChartTitle = () => {
  let viz = this;
  viz.layers.chartTitle
      .append('text')
      .text('History Of The NBA')
      // .attr('stroke', 'black')
      // .attr('stroke-width', .5)
      .attr('font-size', '1.4rem')
}