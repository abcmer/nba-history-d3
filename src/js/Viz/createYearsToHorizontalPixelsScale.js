Viz.prototype.createYearsToHorizontalPixelsScale = (options) => {
  let viz = this;
  let chartWidth = viz.props.chartWidth  
  viz.yearsToHorizontalPixelsScale = d3.scaleLinear()
    .domain([1947,2021])
    .range([chartWidth * .1, chartWidth * .9 - 5])  
}