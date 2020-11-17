Viz.prototype.createTitlesToPixelsScale = (options) => {
  let viz = this;
  const titlesMax = options.titlesMax;
  viz.titlesToPixelsScale = d3.scaleLinear()
    .domain([0,titlesMax + .75])
    .range([0,viz.width - viz.chartMarginRight - viz.chartMarginLeft])  
}