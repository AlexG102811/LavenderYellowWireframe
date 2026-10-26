/* ===== QuizWave — Question banks (Phase 3: 20 questions each) ===== */
var QUIZZES = {
  siege: {
    title: 'Rainbow Six Siege',
    emoji: '🔫',
    questions: [
      { q: 'Which operator can deploy a "Black Mirror" bulletproof one-way mirror?', answers: ['Mira', 'Maestro', 'Castle', 'Frost'], correct: 0, fact: 'Mira deploys Black Mirrors, which can be popped open later into open windows.' },
      { q: 'Thermite\'s exothermic charges are used primarily for…', answers: ['Breaching reinforced walls', 'Destroying drones', 'Healing teammates', 'Jamming electronics'], correct: 0, fact: 'Thermite is a hard breacher who opens reinforced walls.' },
      { q: 'In which year was Rainbow Six Siege originally released?', answers: ['2013', '2015', '2017', '2019'], correct: 1, fact: 'Siege launched December 1, 2015.' },
      { q: 'Gridlock\'s "Avalanche" drone drops what kind of gadget?', answers: ['Sticky spikes that damage and reveal', 'Smoke canisters', 'Cameras', 'Breach charges'], correct: 0, fact: 'Gridlock throws Avalanches that deploy damaging spikes and reveal footsteps.' },
      { q: 'Which map is set on a luxury yacht in the Arctic?', answers: ['Coastline', 'Villa', 'Yacht', 'Kanal'], correct: 2, fact: 'Yacht debuted with Operation Velvet Shell in 2017.' },
      { q: 'What does "ADS" refer to in Siege gameplay terms?', answers: ['Aim Down Sights', 'Attack Drone System', 'Advanced Defense Shield', 'Auto Deploy Station'], correct: 0, fact: 'ADS = Aim Down Sights, the standard shooter term.' },
      { q: 'Which operator is a hard breacher using the "Brimstone BC-3"?', answers: ['Thermite', 'Hibana', 'Ace', 'Thatcher'], correct: 2, fact: 'Ace\'s Brimstone BC-3 throws canisters that cut breaching holes.' },
      { q: 'Which team won the Six Invitational 2022?', answers: ['Team SoloMid', 'G2 Esports', 'Team Empire', 'FaZe Clan'], correct: 0, fact: 'TSM won SI 2022 over Team Empire in the grand final.' },
      { q: 'Wearing Rook\'s Armor Plates guarantees that…', answers: ['You go DBNO instead of dying instantly (barring headshots)', 'You sprint faster', 'Your footsteps are silent', 'You gain an extra primary weapon'], correct: 0, fact: 'Rook plates guarantee wearers enter DBNO instead of dying instantly (barring headshots).' },
      { q: 'The "ping 2.0" system is used for…', answers: ['Marking enemies and gadgets through walls for teammates', 'Reporting players', 'Requesting backup', 'Changing spawn points'], correct: 0, fact: 'Ping 2.0 lets players mark enemies, gadgets, and surfaces contextually.' },
      { q: 'Which Japanese operator uses the "X-KAIROS" pellets to breach?', answers: ['Hibana', 'Echo', 'Ying', 'Dokkaebi'], correct: 0, fact: 'Hibana fires X-KAIROS pellets that detonate in breachable clusters.' },
      { q: 'Which operator can hack enemy cameras and drones with a phone?', answers: ['Dokkaebi', 'Vigil', 'Mute', 'Mozzie'], correct: 0, fact: 'Dokkaebi hacks defenders\' phones, and Logic Bombs ring enemy devices.' },
      { q: 'What is the maximum number of players on a team in standard Siege ranked play?', answers: ['4', '5', '6', '3'], correct: 1, fact: 'Siege is a 5v5 attacker-versus-defender game.' },
      { q: 'The defender operator Jäger\'s ADS gadget does what?', answers: ['Intercepts throwable projectiles like grenades', 'Automatically marks enemies', 'Reinforces walls', 'Detects heartbeats'], correct: 0, fact: 'Jäger\'s Active Defense System zaps grenades and other projectiles.' },
      { q: 'Which attacker uses a "Sledge" hammer to break soft surfaces?', answers: ['Sledge', 'Buck', 'Breach-charging Ash', 'Zofia'], correct: 0, fact: 'Sledge\'s breaching hammer opens soft walls, floors, and hatches.' },
      { q: 'What is the attackers\' name for the mode of planting the defuser on the bomb site?', answers: ['Plant the defuser', 'Arm the charge', 'Secure the zone', 'Hack the panel'], correct: 0, fact: 'Planting the defuser is the attackers\' objective in bomb sites.' },
      { q: 'Which map features the famously bomb-y "Kafe Dostoyevsky" location?', answers: ['Kafe Dostoyevsky is itself the map name', 'Favela', 'Hereford', 'Skyscraper'], correct: 0, fact: 'Kafe Dostoyevsky is set in a Moscow coffee shop and theater.' },
      { q: 'Which operator can use "Spectre" drones to record and replay camera feeds?', answers: ['Deimos', 'Zero', 'Iana', 'Solis'], correct: 1, fact: 'Zero\'s Spectre cameras record video that can be replayed later.' },
      { q: 'What does the acronym "DBNO" stand for?', answers: ['Down But Not Out', 'Dead By Natural Order', 'Deployed But Not Online', 'Defense Base Neutralized Object'], correct: 0, fact: 'Downed-but-not-out teammates can be revived by teammates.' },
      { q: 'Which operator\'s gadget is the "Gyroscopic Mount" allowing a deployable LMG turret?', answers: ['Tachanka (rework)', 'Finka', 'Kapkan', 'Aruni'], correct: 0, fact: 'Tachanka\'s rework gave him the Shumikhal Launcher and mounted LMG on the Gyroscopic Mount.' }
    ]
  },
  baseball: {
    title: 'Baseball',
    emoji: '⚾',
    questions: [
      { q: 'Which player holds the MLB record for most career home runs?', answers: ['Babe Ruth', 'Barry Bonds', 'Hank Aaron', 'Albert Pujols'], correct: 1, fact: 'Barry Bonds hit 762 career home runs.' },
      { q: 'How many strikes make a strikeout in standard baseball rules?', answers: ['2', '3', '4', 'Depends on the inning'], correct: 1, fact: 'Three strikes and you\'re out.' },
      { q: 'Which team has won the most World Series titles?', answers: ['Boston Red Sox', 'St. Louis Cardinals', 'New York Yankees', 'Los Angeles Dodgers'], correct: 2, fact: 'The Yankees have 27 World Series championships.' },
      { q: 'What is a "Grand Slam"?', answers: ['A home run with runners on all three bases', 'Two home runs in one game', 'A diving catch in the outfield', 'A triple play'], correct: 0, fact: 'A grand slam scores four runs — the most possible on one play.' },
      { q: 'Who broke Babe Ruth\'s single-season home run record in 1961?', answers: ['Willie Mays', 'Mickey Mantle', 'Roger Maris', 'Harmon Killebrew'], correct: 2, fact: 'Roger Maris hit 61 homers in 1961 for the Yankees.' },
      { q: 'How many bases must a runner touch to complete an inside-the-park home run?', answers: ['2', '3', '4 (three bases plus home)', '5'], correct: 2, fact: 'Home plate counts as the fourth base, but the runner touches 3 bases plus home.' },
      { q: 'Which pitcher holds the record for most career strikeouts (MLB)?', answers: ['Nolan Ryan', 'Randy Johnson', 'Greg Maddux', 'Clayton Kershaw'], correct: 0, fact: 'Nolan Ryan struck out 5,714 batters in his career.' },
      { q: 'What does the acronym "MVP" stand for in baseball awards?', answers: ['Most Valuable Player', 'Maximum Velocity Pitcher', 'Major Veteran Player', 'Mean Vantage Point'], correct: 0, fact: 'The Most Valuable Player award is given in each league every season.' },
      { q: 'Which team ended a 108-year World Series drought with its 2016 title?', answers: ['Chicago White Sox', 'Chicago Cubs', 'Cleveland Indians', 'Texas Rangers'], correct: 1, fact: 'The Cubs beat the Indians in a thrilling seven-game 2016 Series.' },
      { q: 'A "double play" requires the defense to record how many outs on one continuous play?', answers: ['1', '2', '3', '4'], correct: 1, fact: 'A double play records two outs; a triple play gets three.' },
      { q: 'What is the distance between pitcher\'s mound and home plate in MLB?', answers: ['60 feet 6 inches', '55 feet', '66 feet', '70 feet'], correct: 0, fact: '60 feet 6 inches has been the standard since 1893.' },
      { q: 'Who is MLB\'s all-time hits leader with 4,256 career hits?', answers: ['Ty Cobb', 'Pete Rose', 'Derek Jeter', 'Stan Musial'], correct: 1, fact: 'Pete Rose passed Ty Cobb\'s hit record in 1985.' },
      { q: 'Which pitcher threw the only official perfect game in World Series history?', answers: ['Don Larsen', 'Sandy Koufax', 'Bob Gibson', 'Whitey Ford'], correct: 0, fact: 'Don Larsen\'s 1956 perfect game for the Yankees remains unique in Series history.' },
      { q: 'What is a "foul ball" with two strikes?', answers: ['Counts as a strike but cannot strike out the batter (unless fouled into the catch)', 'Batter is automatically out', 'Counts as a ball', 'Replays the pitch'], correct: 0, fact: 'A batter cannot strike out on an ordinary foul ball with two strikes.' },
      { q: 'Which outfielder is nicknamed "The Say Hey Kid"?', answers: ['Willie Mays', 'Ken Griffey Jr.', 'Roberto Clemente', 'Reggie Jackson'], correct: 0, fact: 'Willie Mays\' over-the-shoulder catch in the 1954 Series is one of baseball\'s most famous plays.' },
      { q: 'How many players are in a team\'s starting batting lineup?', answers: ['8', '9', '10', '7'], correct: 1, fact: 'Nine batters make up the standard lineup in MLB rules.' },
      { q: 'What is the term for a batter hitting safely to all bases in one at-bat (without a home run)?', answers: ['Home run', 'Cycle', 'Triple', 'Inside-the-park double'], correct: 1, fact: 'Hitting a single, double, triple, and home run in one game is "hitting for the cycle."' },
      { q: 'Which team did Babe Ruth famously begin his career with as a pitcher?', answers: ['Boston Red Sox', 'New York Yankees', 'Boston Braves', 'Baltimore Orioles (minor leagues)'], correct: 0, fact: 'Ruth was a star pitcher for the Red Sox before his legendary Yankees career.' },
      { q: 'What does "ERA" measure for a pitcher?', answers: ['Earned Run Average — earned runs allowed per nine innings', 'Extra-base Run Allowed', 'Efficiency Rating Average', 'Emergency Relief Appearances'], correct: 0, fact: 'A lower ERA means a pitcher allows fewer earned runs per nine innings.' },
      { q: 'Which player set the single-season home run record in 2001 with 73 homers?', answers: ['Barry Bonds', 'Mark McGwire', 'Sammy Sosa', 'Ken Griffey Jr.'], correct: 0, fact: 'Bonds hit 73 in 2001, surpassing McGwire\'s 70 from 1998.' }
    ]
  }
};
