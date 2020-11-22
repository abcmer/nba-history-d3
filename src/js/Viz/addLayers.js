Viz.prototype.addLayers = () => {
  const viz = this;
  viz.layers = {};
  viz.layers.axis = viz.Viz.prototype.addGroup({
    'class': 'axis', 
    'xOffset': viz.props.chartMarginLeft, 
    'yOffset': viz.props.height - viz.props.chartMarginDown
  })
  viz.layers.xAxisTicks = {}
  viz.layers.yAxisTicks = {}
  viz.layers.yearSlider = viz.Viz.prototype.addGroup({
    'class': 'yearSlider',
    'xOffset': viz.props.chartWidth * .1,
    'yOffset': viz.props.height - (viz.props.chartMarginDown / 2)
  })
  viz.layers.chartTitle = viz.Viz.prototype.addGroup({
    'class': 'chartTitle',
    'xOffset': viz.props.width - viz.props.chartMarginRight - 440,
    'yOffset': viz.props.chartMarginUp + 30,    
  })
  return viz
}