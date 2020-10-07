import React from 'react';
import styled from 'styled-components';
import { rhythm } from '../utils/typography';
// import profilePic from './avatar.jpg';

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  h3 {
    margin: 8px 0;
    font-size: 16px;
  }
`;

const Bio = () => (
  <figure
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <img
      // src={profilePic}
      alt={`A cat named musa`}
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        borderRadius: '50%',
        width: rhythm(2),
        height: rhythm(2),
      }}
    />

    <Aside>
      <h3>
        <span role="img" aria-label="personal blogs">
          👤 📜
        </span>{' '}
        by <a href="http://github.com/thoamsy">thoamsy</a>
      </h3>
      <h3>Write some personal summary</h3>
    </Aside>
  </figure>
);

export default Bio;
