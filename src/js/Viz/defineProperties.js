const defineMobileProperties = (viz) => {
  viz.props = {
    'barHeight': 50,
    'yTickFontSize': '24',
    'chartMarginLeft': 0,
    'chartMarginRight': 0,
    'chartMarginUp': 0,
    'chartMarginDown': 200,
    'chartTitleFontSize': '1.7rem',
    'width': window.innerWidth,
    'height': window.innerHeight

  }
}

const defineBrowserProperties = (viz) => {
  viz.props = {
    'barHeight': 25,
    'yTickFontSize': '24',
    'chartMarginLeft': 50,
    'chartMarginRight': 200,
    'chartMarginUp': 25,
    'chartMarginDown': 150,
    'chartTitleFontSize': '1.7rem',
    'width': window.innerWidth,
    'height': window.innerHeight       
  }
}

Viz.prototype.defineProperties = () => {
  let viz = this;
  viz.props = {}
  if (viz.isMobile) {
    defineMobileProperties(viz)
  } else {
    defineBrowserProperties(viz)
  }
  viz.props.chartWidth = (window.innerWidth - viz.props.chartMarginLeft - viz.props.chartMarginRight)

}