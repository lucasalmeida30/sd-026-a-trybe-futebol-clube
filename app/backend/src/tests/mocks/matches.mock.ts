const matchesMock = [
    {
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
    },
    {
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: false,
    },
    {
      homeTeamId: 4,
      homeTeamGoals: 3,
      awayTeamId: 11,
      awayTeamGoals: 0,
      inProgress: false,
    },
    {
      homeTeamId: 3,
      homeTeamGoals: 0,
      awayTeamId: 2,
      awayTeamGoals: 0,
      inProgress: true,
    }
  ]

  const matchesInProgress = [
    {
      id: 41,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
      inProgress: true,
    }
]

const matchesFinished = [
    {
        homeTeamId: 9,
        homeTeamGoals: 1,
        awayTeamId: 14,
        awayTeamGoals: 1,
        inProgress: false,
      }
]
  

  export { matchesMock, matchesInProgress, matchesFinished }