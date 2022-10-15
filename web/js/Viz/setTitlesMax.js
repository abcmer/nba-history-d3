Viz.prototype.setTitlesMax = (data) => {
  let viz = this;
  return Math.max(...data.map(t => t.yearsWon.length))
}