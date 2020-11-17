function Viz(options) {
  const viz = this;
  viz.year = 1947;

  const initialize = (options) => { 
    d3.json("/data/teamData.json").then(function(data) {
      data = viz.filterOnYear(data, options.year)  
      data = viz.filterForTitleTeams(data)  
      viz.defineSvgSize()
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
  initialize({'year': viz.year})
  var intervalID = window.setInterval(myCallback, 500);

  function myCallback() {
    if (viz.year < new Date().getFullYear()) {
      viz.year += 1
    } else {
      window.setInterval()
    }
    initialize({'year': viz.year})
   }     
  return viz    
}