Viz.prototype.addChartTitle = () => {
  let viz = this;
  viz.layers.chartTitle
      .append('text')
      .text('NBA Championship Teams Over Time')
      .attr('font-size', '1.7rem')
}