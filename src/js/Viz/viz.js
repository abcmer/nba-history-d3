function Viz(options) {
  const viz = this;
  viz.year = 2021;
  viz.autoPlay = false;

  const initialize = (options) => { 
    d3.json("/data/teamData.json").then(function(allData) {
      viz.checkForMobile()
      viz.defineProperties()
      let filteredData;
      let sortedData;
      filteredData = viz.filterOnYear(allData, options.year)  
      filteredData = viz.filterForTitleTeams(filteredData)
      sortedData = viz.sortData(filteredData)

      viz.addSvg()    
      viz.addChartBackground()  
      viz.addLayers()      
      viz.addChartTitle()
      viz.addZeroCoordinate()
      viz.titlesMax = viz.setTitlesMax(allData)
      viz.createTitlesToPixelsScale({'titlesMax': viz.titlesMax})
      viz.createYearsToHorizontalPixelsScale()
      viz.addAxisLines()
      viz.addXaxisTicks({'titlesMax': viz.titlesMax})
      viz.addYaxisTicks(sortedData)
      viz.addYearSlider({year: viz.year})
      viz.addYearSliderKnob({year: viz.year})
      viz.addBars(sortedData)
            
    })   
    .catch(error => {
      console.log(error)
    })
  }
  initialize({'year': viz.year})
  

  if (viz.autoPlay == true) {
    var intervalID = window.setInterval(myCallback, 500);
    function myCallback() {
      if (viz.year < 2021) {
        viz.year += 1
      } else {
        window.clearInterval()
      }
      initialize({'year': viz.year})
     }    
  }
 
  return viz    
}