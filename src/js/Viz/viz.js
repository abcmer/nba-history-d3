function Viz(options) {
  const viz = this;

  const initialize = (options) => { 
    const teams = ['Lakers', 'Celtics', 'Warriors', 'Bulls', 'Spurs', '76ers', 'Pistons', 'Heat', 'Knicks', 'Rockets', 'Caveliers', 'Hawks', 'Bullets', 'SuperSonics', 'Trail Blazers', 'Bucks', 'Mavericks', 'Royals', 'Raptors']
    d3.json("/data/teamData.json").then(function(data) {
      // viz.titleCountsData = data;
      viz.teamData = data
      viz.year = 2020    
      viz.setTeamsWithAtLeastOneTitle(data)  
      viz.defineSvgSize(options)
      viz.defineGraphMargins()
      viz.addSvg()
      viz.addGraphBackground()
      viz.addLayers()
      viz.addZeroCoordinate()
      viz.addAxisLines()
      viz.addXaxisTicks()
      viz.addYaxisTicks(teams)
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