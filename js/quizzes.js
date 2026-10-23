/* ===== QuizWave — Question banks (Phase 2) ===== */
var QUIZZES = {
  siege: {
    title: 'Rainbow Six Siege',
    emoji: '🔫',
    questions: [
      {
        q: 'Which operator can deploy a "Black Mirror" bulletproof one-way mirror?',
        answers: ['Mira', 'Maestro', 'Castle', 'Frost'],
        correct: 0,
        fact: 'Mira deploys Black Mirrors, which can be popped open later into open windows.'
      },
      {
        q: 'What is the name of the destructible reinforced wall-piercing gadget operators use?',
        answers: ['Breach Charge', 'X-KAIROS', 'Thermite Charge (Exothermic)', 'Sledge hammer'],
        correct: 2,
        fact: 'Thermite\'s exothermic charges breach reinforced walls.'
      },
      {
        q: 'In which year was Rainbow Six Siege originally released?',
        answers: ['2013', '2015', '2017', '2019'],
        correct: 1,
        fact: 'Siege launched December 1, 2015.'
      },
      {
        q: 'Which operator uses the "Avalanche" drone that shoots sticky traps?',
        answers: ['Nomad', 'Gridlock', 'Kaid', 'Warden'],
        correct: 1,
        fact: 'Gridlock\'s Avalanches damage and reveal enemies.'
      },
      {
        q: 'Which map is set on a luxury yacht in the Arctic?',
        answers: ['Coastline', 'Villa', 'Yacht', 'Kanal'],
        correct: 2,
        fact: 'Yacht debuted with Operation Velvet Shell in 2017.'
      },
      {
        q: 'What does "ADS" refer to in Siege gameplay terms?',
        answers: ['Aim Down Sights', 'Attack Drone System', 'Advanced Defense Shield', 'Auto Deploy Station'],
        correct: 0,
        fact: 'ADS = Aim Down Sights, the standard shooter term.'
      },
      {
        q: 'Which operator can hard-breach reinforced walls with the Brimstone BC-3?',
        answers: ['Thermite', 'Hibana', 'Ace', 'Thatcher'],
        correct: 2,
        fact: 'Ace\'s Brimstone BC-3 throws canisters that cut breaching holes.'
      },
      {
        q: 'Which team won the Six Invitational 2022?',
        answers: ['Team SoloMid', 'G2 Esports', 'Team Empire', 'FaZe Clan'],
        correct: 0,
        fact: 'TSM won SI 2022 over Team Empire in the grand final.'
      },
      {
        q: 'The "Rook" operator\'s Armor Plates benefit is best described as…',
        answers: ['Faster sprint speed', 'Guaranteed downed-not-dead state for wearers', 'Silent footsteps', 'Extra primary weapon'],
        correct: 1,
        fact: 'Rook plates guarantee wearers enter DBNO instead of dying instantly (barring headshots).'
      },
      {
        q: 'What is the "ping 2.0" system used for?',
        answers: ['Marking enemies and gadgets through walls for teammates', 'Reporting players', 'Requesting backup', 'Changing spawn points'],
        correct: 0,
        fact: 'Ping 2.0 lets players mark enemies, gadgets, and surfaces contextually.'
      }
    ]
  },
  baseball: {
    title: 'Baseball',
    emoji: '⚾',
    questions: [
      {
        q: 'Which player holds the MLB record for most career home runs?',
        answers: ['Babe Ruth', 'Barry Bonds', 'Hank Aaron', 'Albert Pujols'],
        correct: 1,
        fact: 'Barry Bonds hit 762 career home runs.'
      },
      {
        q: 'How many strikes make a strikeout in standard baseball rules?',
        answers: ['2', '3', '4', 'Depends on the inning'],
        correct: 1,
        fact: 'Three strikes and you\'re out.'
      },
      {
        q: 'Which team has won the most World Series titles?',
        answers: ['Boston Red Sox', 'St. Louis Cardinals', 'New York Yankees', 'Los Angeles Dodgers'],
        correct: 2,
        fact: 'The Yankees have 27 World Series championships.'
      },
      {
        q: 'What is a "Grand Slam"?',
        answers: ['A home run with runners on all three bases', 'Two home runs in one game', 'A diving catch in the outfield', 'A triple play'],
        correct: 0,
        fact: 'A grand slam scores four runs — the most possible on one play.'
      },
      {
        q: 'Who broke Babe Ruth\'s single-season home run record in 1961?',
        answers: ['Willie Mays', 'Mickey Mantle', 'Roger Maris', 'Harmon Killebrew'],
        correct: 2,
        fact: 'Roger Maris hit 61 homers in 1961 for the Yankees.'
      },
      {
        q: 'How many bases must a runner touch to complete an inside-the-park home run?',
        answers: ['2', '3', '4', '5'],
        correct: 2,
        fact: 'Home plate counts as the fourth base, but the runner touches 3 bases plus home.'
      },
      {
        q: 'Which pitcher holds the record for most career strikeouts (MLB)?',
        answers: ['Nolan Ryan', 'Randy Johnson', 'Greg Maddux', 'Clayton Kershaw'],
        correct: 0,
        fact: 'Nolan Ryan struck out 5,714 batters in his career.'
      },
      {
        q: 'What does the acronym "MVP" stand for in baseball awards?',
        answers: ['Most Valuable Player', 'Maximum Velocity Pitcher', 'Major Veteran Player', 'Mean Vantage Point'],
        correct: 0,
        fact: 'The Most Valuable Player award is given in each league every season.'
      },
      {
        q: 'Which team ended a 108-year World Series drought with its 2016 title?',
        answers: ['Chicago White Sox', 'Chicago Cubs', 'Cleveland Indians', 'Texas Rangers'],
        correct: 1,
        fact: 'The Cubs beat the Indians in a thrilling seven-game 2016 Series.'
      },
      {
        q: 'A "double play" requires the defense to record how many outs on one continuous play?',
        answers: ['1', '2', '3', '4'],
        correct: 1,
        fact: 'A double play records two outs; a triple play gets three.'
      }
    ]
  }
};
