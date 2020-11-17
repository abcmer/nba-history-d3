Viz.prototype.createTitlesToPixelsScale = (options) => {
  let viz = this;
  const titlesMax = options.titlesMax;
  viz.titlesToPixelsScale = d3.scaleLinear()
    .domain([0,titlesMax + 1])
    .range([0,viz.width - viz.graphMarginRight - viz.graphMarginLeft])  
}