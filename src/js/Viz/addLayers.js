Viz.prototype.addLayers = () => {
  const viz = this;
  viz.layers = {};
  viz.layers.axis = viz.Viz.prototype.addGroup({'class': 'axis', 'xOffset': 40, 'yOffset': viz.height - 40})
  return viz
}