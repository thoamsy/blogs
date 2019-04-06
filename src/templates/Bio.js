import React from 'react';
import { rhythm } from '../utils/typography';
import profilePic from './avatar.jpg';

const Bio = () => (
  <figure
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <img
      src={profilePic}
      alt={`A cat named musa`}
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        borderRadius: '50%',
        width: rhythm(2),
        height: rhythm(2),
      }}
    />
    <h4 style={{ margin: 0 }}>Just Happy</h4>
  </figure>
);

export default Bio;
