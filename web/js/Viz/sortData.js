Viz.prototype.sortData = (teamData) => {
  function compare( a, b ) {
    if ( a.yearsWon.length > b.yearsWon.length ){
        return -1;
    }
    if ( a.yearsWon.length < b.yearsWon.length ){
        return 1;
    }
    return 0;
    }
    
    teamData.sort( compare );
    return teamData
       
}