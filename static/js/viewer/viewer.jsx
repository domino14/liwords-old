import React from 'react';

import Board from '../board';
import Scoresheet from '../scoresheet';
import { BoardStateCalculator } from '../board_state';
import { CrosswordGameDistribution } from '../tile_distributions';
import { CrosswordGameSetup } from '../board_setups';

const gameRepr = JSON.parse(`{
  "turns": [
    {
      "score": "26",
      "row": 7,
      "rack": "GNRUW",
      "pos": "8D",
      "play": "WRUNG",
      "nick": "leesa",
      "dir": "h",
      "cumul": "26",
      "col": 3,
      "type": "move",
      "note": ""
    },
    {
      "score": "22",
      "row": 6,
      "rack": "ACMNNUX",
      "pos": "7F",
      "play": "XU",
      "nick": "cesar",
      "dir": "h",
      "cumul": "22",
      "col": 5,
      "type": "move",
      "note": ""
    },
    {
      "score": "68",
      "row": 5,
      "rack": "AEHILST",
      "pos": "6G",
      "play": "HALITES",
      "nick": "leesa",
      "dir": "h",
      "cumul": "94",
      "col": 6,
      "type": "move",
      "note": ""
    },
    {
      "score": "24",
      "row": 3,
      "rack": "ACDKMNN",
      "pos": "L4",
      "play": "KN.AD",
      "nick": "cesar",
      "dir": "v",
      "cumul": "46",
      "col": 11,
      "type": "move",
      "note": ""
    },
    {
      "score": "18",
      "row": 7,
      "rack": "DOO",
      "pos": "8L",
      "play": ".ODO",
      "nick": "leesa",
      "dir": "h",
      "cumul": "112",
      "col": 11,
      "type": "move",
      "note": ""
    },
    {
      "score": "14",
      "row": 6,
      "rack": "CEMNNRT",
      "pos": "O7",
      "play": "C.NTEMN",
      "nick": "cesar",
      "dir": "v",
      "cumul": "60",
      "col": 14,
      "type": "move",
      "note": "oh no, i wasn't sure of CENTRA for some reason, and eventually saw the possibility of a 9 with CONTEMN. CENTRA is clearly the star play here, but CONTEMN ended up working out better for me."
    },
    {
      "score": "61",
      "row": 4,
      "rack": "?CIOSTU",
      "pos": "J5",
      "play": "f.CTIOUS",
      "nick": "leesa",
      "dir": "v",
      "cumul": "173",
      "col": 9,
      "type": "move",
      "note": ""
    },
    {
      "rack": "?CIOSTU",
      "nick": "leesa",
      "lost_score": "61",
      "cumul": "112",
      "type": "lost_challenge",
      "note": ""
    },
    {
      "score": "39",
      "row": 6,
      "rack": "EEHIRRY",
      "pos": "O7",
      "play": ".......ER",
      "nick": "cesar",
      "dir": "v",
      "cumul": "99",
      "col": 14,
      "type": "move",
      "note": "i didn't immediately see any bingoes ending in E or R so this seemed good. i sorta need a lot of good luck now"
    },
    {
      "rack": "?CIOSTU",
      "nick": "leesa",
      "cumul": "112",
      "type": "pass",
      "note": "she challenged!"
    },
    {
      "score": "37",
      "row": 11,
      "rack": "BEEHIRY",
      "pos": "N12",
      "play": "HEY",
      "nick": "cesar",
      "dir": "v",
      "cumul": "136",
      "col": 13,
      "type": "move",
      "note": ""
    },
    {
      "score": "24",
      "row": 10,
      "rack": "?CIOSTU",
      "pos": "M11",
      "play": "COT",
      "nick": "leesa",
      "dir": "v",
      "cumul": "136",
      "col": 12,
      "type": "move",
      "note": ""
    },
    {
      "score": "72",
      "row": 9,
      "rack": "ABDEIRS",
      "pos": "10G",
      "play": "DARBIES",
      "nick": "cesar",
      "dir": "h",
      "cumul": "208",
      "col": 6,
      "type": "move",
      "note": "didn't see BAWDRIES, but i like that i'll likely force her to open the triple lane if she bingoes making SHUN"
    },
    {
      "score": "10",
      "row": 3,
      "rack": "UY",
      "pos": "4J",
      "play": "YU.",
      "nick": "leesa",
      "dir": "h",
      "cumul": "146",
      "col": 9,
      "type": "move",
      "note": ""
    },
    {
      "score": "30",
      "row": 2,
      "rack": "AAEEIQR",
      "pos": "K3",
      "play": "Q.I.",
      "nick": "cesar",
      "dir": "v",
      "cumul": "238",
      "col": 10,
      "type": "move",
      "note": "this is suddenly really going my way"
    },
    {
      "score": "6",
      "row": 9,
      "rack": "GU",
      "pos": "J10",
      "play": ".UG",
      "nick": "leesa",
      "dir": "v",
      "cumul": "152",
      "col": 9,
      "type": "move",
      "note": ""
    },
    {
      "score": "22",
      "row": 7,
      "rack": "AAEEORW",
      "pos": "D8",
      "play": ".OWEE",
      "nick": "cesar",
      "dir": "v",
      "cumul": "260",
      "col": 3,
      "type": "move",
      "note": ""
    },
    {
      "score": "69",
      "row": 4,
      "rack": "?ILORST",
      "pos": "5A",
      "play": "TROILuS",
      "nick": "leesa",
      "dir": "h",
      "cumul": "221",
      "col": 0,
      "type": "move",
      "note": ""
    },
    {
      "score": "36",
      "row": 0,
      "rack": "AAFLOOR",
      "pos": "A1",
      "play": "ALOF.",
      "nick": "cesar",
      "dir": "v",
      "cumul": "296",
      "col": 0,
      "type": "move",
      "note": ""
    },
    {
      "score": "28",
      "row": 1,
      "rack": "AAF",
      "pos": "B2",
      "play": "AFA.",
      "nick": "leesa",
      "dir": "v",
      "cumul": "249",
      "col": 1,
      "type": "move",
      "note": ""
    },
    {
      "score": "36",
      "row": 8,
      "rack": "AEIOOPR",
      "pos": "C9",
      "play": "POORI",
      "nick": "cesar",
      "dir": "v",
      "cumul": "332",
      "col": 2,
      "type": "move",
      "note": ""
    },
    {
      "score": "29",
      "row": 8,
      "rack": "AB",
      "pos": "B9",
      "play": "AB",
      "nick": "leesa",
      "dir": "v",
      "cumul": "278",
      "col": 1,
      "type": "move",
      "note": ""
    },
    {
      "score": "20",
      "row": 10,
      "rack": "ADEEELT",
      "pos": "11H",
      "play": "LE.D",
      "nick": "cesar",
      "dir": "h",
      "cumul": "352",
      "col": 7,
      "type": "move",
      "note": "ok i guess, 7J TEA is best."
    },
    {
      "score": "3",
      "row": 1,
      "rack": "T",
      "pos": "2A",
      "play": "..T",
      "nick": "leesa",
      "dir": "h",
      "cumul": "281",
      "col": 0,
      "type": "move",
      "note": ""
    },
    {
      "score": "27",
      "row": 3,
      "rack": "AEEMPTZ",
      "pos": "4D",
      "play": "PAM",
      "nick": "cesar",
      "dir": "h",
      "cumul": "379",
      "col": 3,
      "type": "move",
      "note": "D1 ZEP is fine, but i'm afraid of a giant bingo. ZINGIESt or something like that?"
    },
    {
      "score": "12",
      "row": 7,
      "rack": "J",
      "pos": "B8",
      "play": "J..",
      "nick": "leesa",
      "dir": "v",
      "cumul": "293",
      "col": 1,
      "type": "move",
      "note": ""
    },
    {
      "score": "13",
      "row": 0,
      "rack": "EEENTVZ",
      "pos": "1C",
      "play": "EVEN",
      "nick": "cesar",
      "dir": "h",
      "cumul": "392",
      "col": 2,
      "type": "move",
      "note": ""
    },
    {
      "score": "33",
      "row": 0,
      "rack": "GIN",
      "pos": "1C",
      "play": "....ING",
      "nick": "leesa",
      "dir": "h",
      "cumul": "326",
      "col": 2,
      "type": "move",
      "note": ""
    },
    {
      "score": "25",
      "row": 11,
      "rack": "AEIITVZ",
      "pos": "E12",
      "play": "ZITI",
      "nick": "cesar",
      "dir": "v",
      "cumul": "417",
      "col": 4,
      "type": "move",
      "note": ""
    },
    {
      "score": "9",
      "row": 13,
      "rack": "?EIRS",
      "pos": "14E",
      "play": ".RInES",
      "nick": "leesa",
      "dir": "h",
      "cumul": "335",
      "col": 4,
      "type": "move",
      "note": ""
    },
    {
      "score": "12",
      "rack": "AEV",
      "nick": "leesa",
      "cumul": "347",
      "type": "end_rack_points",
      "note": ""
    }
  ],
  "state": null,
  "players": [
    {
      "real_name": "leesa",
      "p_number": "1",
      "nick": "leesa"
    },
    {
      "real_name": "cesar",
      "p_number": "2",
      "nick": "cesar"
    }
  ]
}`);

const boardStateCalculator = new BoardStateCalculator(
  gameRepr.turns,
  CrosswordGameDistribution,
);

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTurn: 0,
    };
  }

  render() {
    const maxTurnIndex = gameRepr.turns.length - 1;
    return (
      <div className="row">
        <div className="col-lg-5">
          <Board
            gridWidth={15}
            gridHeight={15}
            boardWidth={500}
            boardHeight={500}
            gridLayout={CrosswordGameSetup}
            tilesLayout={boardStateCalculator
              .computeLayout(this.state.currentTurn).layoutString()}
            showBonusLabels
          />
        </div>
        <div className="col-lg-3">
          <Scoresheet
            gameRepr={gameRepr}
            currentTurn={this.state.currentTurn}
            stepForward={() => this.setState({
              currentTurn: Math.min(this.state.currentTurn + 1, maxTurnIndex),
            })}
            stepBackward={() => this.setState({
              currentTurn: Math.max(this.state.currentTurn - 1, 0),
            })}
            fastForward={() => this.setState({
              currentTurn: maxTurnIndex,
            })}
            fastBackward={() => this.setState({
              currentTurn: 0,
            })}
          />
        </div>
      </div>
    );
  }
}

export default Viewer;
