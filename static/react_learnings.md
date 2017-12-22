- Your renderTileLetter, renderPointValue, and renderTiles are _perfect_ candidates for extracting into separate (functional) components.

- The rule is simple: If setState in _any_ way depends on the current state or props you must use the callback form and not use this.props/this.state  (see stepForward for example in Scoresheet)
- 
