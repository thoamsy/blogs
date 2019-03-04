import React, { useState } from 'react';
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.625rem;
`;

const THEME = 'theme';
const Layout = ({ location, title, children }) => {
  const [checked, setChecked] = useState(window.__preferTheme);

  let rootPath = '/';
  if (typeof __PATH_PREFIX__ !== 'undefined') {
    rootPath = __PATH_PREFIX__ + `/`;
  }
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1),
          marginBottom: 0,
          marginTop: 0,
        }}
      >
        <HomeLink>{title}</HomeLink>
      </h1>
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
        <Header>
          {header}
          <Toggle
            checked={checked}
            icons={{
              checked: <span>🌚</span>,
              unchecked: <span>🌞</span>,
            }}
            onChange={checked => {
              const theme = checked ? 'dark' : 'light';
              document.body.className = theme;
              setChecked(checked);
              localStorage.setItem(THEME, theme);
            }}
          />
        </Header>
        {children}
      </article>
    </PostContainer>
  );
};

export default Layout;
