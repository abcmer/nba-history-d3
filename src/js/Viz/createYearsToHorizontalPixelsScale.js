Viz.prototype.createYearsToHorizontalPixelsScale = (options) => {
  let viz = this;
  viz.yearsToHorizontalPixelsScale = d3.scaleLinear()
    .domain([1947,new Date().getFullYear()])
    .range([viz.chartWidth * .1, viz.chartWidth * .9 - 5])  
}