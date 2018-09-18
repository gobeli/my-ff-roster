import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import FieldText from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import positions from '../../data/positions.json';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  onChange = position => e => {
    this.props.changePosition(position, +e.target.value);
  }

  render() {
    return (
      <Fragment>
        <h1>Settings</h1>
        {positions.map(p => (
          <FieldText
            key={p.position}
            label={p.position}
            value={this.props.settings[p.position]}
            type="number"
            onChange={this.onChange(p.position)}
          />
        ))}
        <p>
          <Button onClick={this.props.onSave}>Save</Button>
        </p>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings
})

const changePosition = (position, value) =>({
  type: `SET_${position}`,
  value
});

export default connect(
  mapStateToProps,
  { changePosition: changePosition }
)(Settings)