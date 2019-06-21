import { Link } from 'gatsby';
import 'prismjs/themes/prism-okaidia.css';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import '../globalThis';
import { rhythm, scale } from '../utils/typography';
import Bio from './Bio';
import { Home, Detail } from './components/Transition';

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

const BlogTitle = ({ location, isRoot, title }) => {
  return isRoot ? (
    <h1
      style={{
        ...scale(1),
        marginBottom: 0,
        marginTop: 0,
      }}
    >
      <HomeLink>{title}</HomeLink>
    </h1>
  ) : (
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
};

const BlogHeader = ({ location, title, isRoot }) => {
  useEffect(() => {
    const colorSchemeChanged = ({ matches }) => {
      document.body.className = matches ? 'dark' : 'light';
    };

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media && media.addListener(colorSchemeChanged);
    colorSchemeChanged({
      matches: media.matches
    });
    return () => media && media.removeListener(colorSchemeChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>
        <BlogTitle title={title} location={location} isRoot={isRoot} />
      </Header>
      {isRoot && <Bio />}
    </>
  );
};

const Layout = ({ location, title, children }) => {
  let rootPath = '/';
  if (typeof __PATH_PREFIX__ !== 'undefined') {
    rootPath = __PATH_PREFIX__ + `/`;
  }
  const isRoot = location.pathname === rootPath;

  const Container = isRoot ? Home : Detail;
  return (
    <Container>
      <BlogHeader isRoot={isRoot} title={title} location={location} />
      {children}
    </Container>
  );
};

export default Layout;
