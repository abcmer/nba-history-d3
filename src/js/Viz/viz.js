function Viz(options) {
  const viz = this;

  const initialize = (options) => {
    viz.defineSize(options)
    viz.addSvg()
    viz.addBackgroundColor()
    viz.addLayers()  
    viz.addZeroCoordinate()
    viz.addXaxis()
    viz.addYaxis()
  }
  initialize(options)
  return viz    
}