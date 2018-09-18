import React from 'react';

const styles = {
  width: '85%',
  maxWidth: '700px',
  padding: '1rem',
  margin: 'auto'
};

const Container = (props) => (
  <div style={styles}>
    {props.children}
  </div>
);

export default Container;