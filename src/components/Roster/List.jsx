import React, { Component, Fragment } from 'react';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import Search from './Search/Search';
import Table from './Table';

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      selectedPosition: null,
      modalSelectedPlayer: null,
    }
    this.loadPlayers();
  }

  loadPlayers() {
    fetch('http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2018')
      .then(res => res.json())
      .then(res => {
        this.setState({players: res.players});
      });
  }

  searchChange = (player) => {
    this.setState({
      modalSelectedPlayer: player,
    });
  }

  openModal = (player) => () => {
    this.setState({
      selectedPosition: player
    });
  }

  closeModal = () => {
    this.setState({
      selectedPosition: null
    });
  }

  setPlayer = () => {
    if (!this.state.modalSelectedPlayer) {
      return;
    }
    this.props.onPlayerChange(this.state.selectedPosition, this.state.modalSelectedPlayer);
    this.setState({
      selectedPosition: null,
      modalSelectedPlayer: null
    })
  }

  render() {
    const modalActions = [
      { text: 'OK', onClick: this.setPlayer },
      { text: 'Close', onClick: this.closeModal },
    ];


    return (
      <Fragment>
        <ModalTransition>
          {this.state.selectedPosition &&
            <Modal onClose={this.closeModal} actions={modalActions} heading="Select Player">
              <Search selectedPosition={this.state.selectedPosition} players={this.state.players} onChange={this.searchChange}></Search>
            </Modal>
          }
        </ModalTransition>
        <Table positions={this.props.positions}
          actions={(player) => (
            <Button onClick={this.openModal(player).bind(this)}>
              {player.name ? 'Replace' : 'Add'}
            </Button>
          )}>
        </Table>
      </Fragment>
    );
  }
}


