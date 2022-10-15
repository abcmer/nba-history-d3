Viz.prototype.addChartTitle = () => {
  let viz = this;
  viz.layers.chartTitle
      .append('text')
      .text('NBA Championship Teams Over Time')
      .attr('font-size', viz.props.chartTitleFontSize)
}