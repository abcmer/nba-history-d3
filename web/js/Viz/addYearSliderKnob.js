Viz.prototype.addYearSliderKnob = (options) => {
  
  let viz = this;
  viz.layers.yearSliderKnob = viz.layers.yearSlider
    .append('g')
    .attr('class', 'yearSliderKnob')
    .attr('transform', `translate(${viz.yearsToHorizontalPixelsScale(options.year)}, 0)`)

  viz.layers.yearSliderKnob
    .append('text')
    .attr('y', 25)
    .text(options.year)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')    
            
  viz.layers.yearSliderKnob
    .append('circle')
    .attr("r", 10)
    .style("fill", "white")
    .style("stroke-width", 3)
    .style("stroke", "black")    
}