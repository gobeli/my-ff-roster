import React, { Component } from 'react';
import { QuickSearch, PersonResult, ResultItemGroup } from '@atlaskit/quick-search';
import './search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      selectedPlayer: null
    }
  }

  filterName = term => p =>
    term && p.name.toLowerCase().includes(term.toLowerCase())

  filterPosition = p => {
    if (!this.props.selectedPosition) {
      return false;
    }
    switch (this.props.selectedPosition.position) {
      case 'FLEX':
        return p.position === 'RB' || p.position === 'WR';
      case 'Bench':
        return true;
      default:
        return p.position === this.props.selectedPosition.position;
    }
  }

  getOptionLabel = option => `${option.position} - ${option.name}`;

  onChange = player => {
    this.setState({
      selectedPlayer: player
    });
    player && player.id  && this.props.onChange(player);
  }

  search = val => {
    const players = this.props.players &&
      this.props.players.filter(this.filterName(val)).filter(this.filterPosition);
    players.length = players.length > 10 ? 10 : players.length;
    this.setState({
      foundPlayers: players
    });
  }

  render() {
    return (
      <QuickSearch
        defaultValue=""
        onSearchInput={({ target }) => { this.search(target.value); }}
      >
        <ResultItemGroup title="Players">
          {this.state.foundPlayers && this.state.foundPlayers.map(p => (
            <div key={p.id} className={this.state.selectedPlayer && this.state.selectedPlayer.id === p.id ? 'person--active' : '' }>
              <PersonResult
                isSelected={this.state.selectedPlayer && this.state.selectedPlayer.id === p && p.id}
                onClick={() => this.onChange(p)}
                resultId={p.id}
                avatarUrl={`http://s.nflcdn.com/static/content/public/static/img/fantasy/transparent/200x200/${p.esbid}.png`}
                name={p.name}
                presenceMessage={`${p.position} - ${p.teamAbbr}`} />
            </div>
            )
          )}
        </ResultItemGroup>
      </QuickSearch>
    );
  }
}

export default Search;