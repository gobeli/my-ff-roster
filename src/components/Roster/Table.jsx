import React from 'react';
import TableTree, { Headers, Header, Rows, Row, Cell } from '@atlaskit/table-tree';
import Tag from '@atlaskit/tag';
import positionColors from '../../data/positions.json';

const getColor = pos => positionColors
  .find(p => p.position === pos.position) || {};

const Table = ({ positions, actions }) => (
  <TableTree>
    <Headers>
      <Header width={80}>Pos</Header>
      <Header width="100%">Name</Header>
      <Header></Header>
    </Headers>
    <Rows items={positions}
      render={(position) => (
        <Row itemId={position.id}>
          <Cell>
            <Tag color={getColor(position).color} text={position.position}></Tag>
          </Cell>
          <Cell singleLine>
            {position.player ? position.player.name : '-- Choose Player --'}
            <small>&nbsp; {position.player && position.player.teamAbbr}</small>
          </Cell>
          <Cell>{actions(position)}</Cell>
        </Row>
      )}
    >
    </Rows>
  </TableTree>
);

export default Table;