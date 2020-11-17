Viz.prototype.addLayers = () => {
  const viz = this;
  viz.layers = {};
  viz.layers.axis = viz.Viz.prototype.addGroup({
    'class': 'axis', 
    'xOffset': viz.chartMarginLeft, 
    'yOffset': viz.height - viz.chartMarginDown
  })
  viz.layers.xAxisTicks = {}
  viz.layers.yAxisTicks = {}
  viz.layers.yearSlider = viz.Viz.prototype.addGroup({
    'class': 'yearSlider',
    'xOffset': viz.chartMarginLeft,
    'yOffset': viz.height - (viz.chartMarginDown / 1.5)
  })
  viz.layers.chartTitle = viz.Viz.prototype.addGroup({
    'class': 'chartTitle',
    'xOffset': viz.width - viz.chartMarginRight - 280,
    'yOffset': viz.chartMarginUp + 30,    
  })
  return viz
}