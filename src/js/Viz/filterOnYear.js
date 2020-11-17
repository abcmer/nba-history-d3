Viz.prototype.filterOnYear = (data, year) => {
  let viz = this
  const filteredData = data.map(t => {
    return {
      'shortName': t.shortName,
      'yearsWon': t.yearsWon.filter(y => y <= year)
    }
  })
  return filteredData
}