Viz.prototype.addLayers = () => {
  const viz = this;
  viz.layers = {};
  viz.layers.axis = viz.Viz.prototype.addGroup({
    'class': 'axis', 
    'xOffset': viz.graphMarginLeft, 
    'yOffset': viz.height - viz.graphMarginDown
  })
  viz.layers.xAxisTicks = {}
  viz.layers.yAxisTicks = {}
  viz.layers.yearSlider = viz.Viz.prototype.addGroup({
    'class': 'yearSlider',
    'xOffset': viz.graphMarginLeft,
    'yOffset': viz.height - (viz.graphMarginDown / 2)
  })
  return viz
}