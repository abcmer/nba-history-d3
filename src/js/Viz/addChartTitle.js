Viz.prototype.addChartTitle = () => {
  let viz = this;
  viz.layers.chartTitle
      .append('text')
      .text('History of The NBA')
      // .attr('stroke', 'black')
      // .attr('stroke-width', .5)
      .attr('font-size', '2rem')
}