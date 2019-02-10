import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Toggle from './ThemeToggle';

import 'prismjs/themes/prism-okaidia.css';
import { rhythm, scale } from '../utils/typography';

const PostContainer = styled.main`
  color: var(--textNormal);
  background: var(--bg);
  transition: color 0.3s ease-out, background 0.3s ease-out;
  min-height: 100vh;
`;

const HomeLink = styled(Link).attrs({ to: '/' })`
  box-shadow: none;
  text-decoration: none;
  color: var(--textTitle);
`;

const Layout = ({ location, title, children }) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const colorSchemeChanged = ({ matches }) => {
      document.body.className = matches ? 'dark' : 'light';
      setChecked(matches);
    };

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media && media.addListener(colorSchemeChanged);
    colorSchemeChanged(media);
    return () => media && media.removeListener(colorSchemeChanged);
  }, []);

  let rootPath = '/';
  if (typeof __PATH_PREFIX__ !== 'undefined') {
    rootPath = __PATH_PREFIX__ + `/`;
  }
  let header;

  if (location.pathname === rootPath) {
    header = (
      <>
        <h1
          style={{
            ...scale(1),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <HomeLink>{title}</HomeLink>
        </h1>
        <Toggle
          checked={checked}
          icons={{
            checked: <span>🌚</span>,
            unchecked: <span>🌞</span>,
          }}
          onChange={checked => {
            document.body.className = checked ? 'dark' : 'light';
            setChecked(checked);
          }}
        />
      </>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: 'sans-serif',
          marginTop: 0,
          marginBottom: rhythm(-1),
        }}
      >
        <HomeLink>{title}</HomeLink>
      </h3>
    );
  }
  return (
    <PostContainer>
      <article
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children}
      </article>
    </PostContainer>
  );
};

export default Layout;
