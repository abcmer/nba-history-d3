function Viz(options) {
  const viz = this;

  const initialize = (options) => {
    viz.defineSize(options)
    viz.defineGraphMargins()
    viz.addSvg()
    viz.addBackgroundColor()
    viz.addLayers()  
    viz.addZeroCoordinate()
    viz.addXaxis()
    viz.addXaxisTicks()
    viz.addYaxisTicks()
    viz.addYaxis()
  }
  initialize(options)
  return viz    
}