Viz.prototype.createYearsToHorizontalPixelsScale = (options) => {
  let viz = this;
  viz.yearsToHorizontalPixelsScale = d3.scaleLinear()
    .domain([1947,new Date().getFullYear()])
    .range([35,viz.width - viz.chartMarginRight - viz.chartMarginLeft - 35])  
}