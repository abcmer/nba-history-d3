function Viz(options) {
  const viz = this;

  const initialize = (options) => {
    viz.defineSvgSize(options)
    viz.defineGraphMargins()
    viz.addSvg()
    viz.addGraphBackground()
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