Viz.prototype.addLayers = () => {
  const viz = this;
  viz.layers = {};
  viz.layers.axis = viz.Viz.prototype.addGroup({'class': 'axis', 'xOffset': 120, 'yOffset': viz.height - viz.graphMarginDown})
  viz.layers.xAxisTicks = {}
  viz.layers.yAxisTicks = {}
  return viz
}