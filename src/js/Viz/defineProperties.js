const defineMobileProperties = (viz) => {
  viz.props = {
    'barHeight': 50,
    'yTickFontSize': '1.2rem'
  }
}

const defineBrowserProperties = (viz) => {
  viz.props = {
    'barHeight': 12,
    'yTickFontSize': '1rem'
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
}