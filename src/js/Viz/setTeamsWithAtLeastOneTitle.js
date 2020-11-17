Viz.prototype.setTeamsWithAtLeastOneTitle = (data) => {
  let viz = this;
  viz.teams = data.filter(t => t.yearsWon.length > 0).map(t => t.shortName)
}