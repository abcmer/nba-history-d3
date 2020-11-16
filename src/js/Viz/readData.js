Viz.prototype.readData = () => {
  let viz = this;
  return new Promise((resolve, reject) => {
    d3.json("/data/titleCounts.json").then(function(data) {
      resolve(data)
    })
    reject('data read error')
  })
}