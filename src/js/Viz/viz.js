function Viz(options) {
  const viz = this;

  const initialize = (options) => { 
    d3.json("/data/teamData.json").then(function(data) {
      viz.year = 2008  
      data = viz.filterOnYear(data, viz.year)  
      data = viz.filterForTitleTeams(data)  
      viz.defineSvgSize(options)
      viz.defineChartMargins()
      viz.addSvg()    
      viz.addChartBackground()  
      viz.addLayers()
      
      viz.addChartTitle()
      viz.addZeroCoordinate()
      viz.titlesMax = viz.setTitlesMax(data)
      viz.createTitlesToPixelsScale({'titlesMax': viz.titlesMax})
      viz.createYearsToHorizontalPixelsScale()
      viz.addAxisLines()
      viz.addXaxisTicks({'titlesMax': viz.titlesMax})
      viz.addYaxisTicks(data)
      viz.addYearSlider({
        year: viz.year        
      })  
      viz.addBars(data)     
    })   
    .catch(error => {
      console.log(error)
    })
  }
  initialize(options)
  return viz    
}