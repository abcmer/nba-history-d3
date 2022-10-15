Viz.prototype.filterForTitleTeams = (data) => {
  return data.filter(t => t.yearsWon.length > 0)
}