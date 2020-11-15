Viz.prototype.addGroup = (options) => {
  const viz = this;
  const group = d3.select('svg')
    .append('g')
    .attr('class', options.class)
    .attr('transform', `translate(${options.xOffset}, ${options.yOffset})`)

  return group
}