Viz.prototype.createTitlesToPixelsScale = (options) => {
  let viz = this;
  const titlesMax = options.titlesMax;
  viz.titlesToPixelsScale = d3.scaleLinear()
    .domain([0,titlesMax + 1.8])
    .range([0,viz.props.width - viz.props.chartMarginRight - viz.props.chartMarginLeft])  
}