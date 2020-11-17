function Viz(options) {
  const viz = this;

  const initialize = (options) => { 
    d3.json("/data/teamData.json").then(function(data) {
      // viz.titleCountsData = data;
      viz.year = 2006  
      data = viz.filterOnYear(data, viz.year)  
      data = viz.filterForTitleTeams(data)  
      viz.defineSvgSize(options)
      viz.defineGraphMargins()
      viz.addSvg()
      viz.addGraphBackground()
      viz.addLayers()
      viz.addZeroCoordinate()
      viz.titlesMax = viz.setTitlesMax(data)
      viz.createTitlesToPixelsScale({'titlesMax': viz.titlesMax})
      viz.addAxisLines()
      viz.addXaxisTicks({'titlesMax': viz.titlesMax})
      viz.addYaxisTicks(data)
      viz.addYearSlider()  
      viz.addBars(data)     
    })   
    .catch(error => {
      console.log(error)
    })
  }
  initialize(options)
  return viz    
}