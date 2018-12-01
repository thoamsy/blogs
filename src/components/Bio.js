import React from 'react';

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import profilePic from './profile-pic.jpg';
import { rhythm } from '../utils/typography';

const Bio = () => (
  <div
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
  </div>
);

export default Bio;
