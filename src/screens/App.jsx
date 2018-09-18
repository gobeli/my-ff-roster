import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux'
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import Drawer from '@atlaskit/drawer';
import Button from '@atlaskit/button';
import { Link } from 'react-router-dom';
import Settings from  '../components/Settings/Settings';
import Container from '../components/UI/Container';
import PlayerList from '../components/Roster/List';
import styled from 'styled-components';

const Icon = <SettingsIcon label="Settings" />;

const SettingsLink = styled(Link)`
  text-align: right;
  display: block;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positions: []
    }
  }

  componentDidMount() {
    this.setPositions();
  }

  setPositions = () => {
    const settings = Object.keys(this.props.settings)
      .map(p => ({ position: p, value: this.props.settings[p] }));
    const positions = [...settings].map((s, i) => [...new Array(s.value)].map((p, j) => ({
      id: `${i}.${j}`,
      position: s.position,
      player: null
    }))).reduce((a,b) => a.concat(b));
    this.setState({
      positions
    });
  }

  setPlayer = (selectedPosition, selectedPlayer) => {
    const index = this.state.positions.indexOf(selectedPosition);
    this.setState({
      positions: Object.assign([...this.state.positions],
        { [index]: {...selectedPosition, player: selectedPlayer }
      })
    });
  }

  openDrawer = () => this.setState({ isDrawerOpen: true });
  closeDrawer = () => {
    this.setPositions();
    this.setState({ isDrawerOpen: false })
  };

  render() {
    return (
      <Fragment>
        <Drawer
          onClose={this.closeDrawer}
          isOpen={this.state.isDrawerOpen}
        >
          <Settings onSave={this.closeDrawer}></Settings>
        </Drawer>
        <header>
          <Container>
            <h1>My Roster</h1>
          </Container>
        </header>
        <Container>
          <Button iconAfter={Icon} onClick={this.openDrawer}>Settings</Button>
          <PlayerList positions={this.state.positions} onPlayerChange={this.setPlayer}></PlayerList>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
)(App);