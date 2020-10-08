import 'prismjs/themes/prism-tomorrow.css';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import '../globalThis';
import { rhythm, scale } from '../utils/typography';
import Bio from './Bio';
import { Home, Detail } from './Transition';
import config from '../config';

const HomeLink = styled(Link).attrs({ href: '/' })`
  box-shadow: none;
  text-decoration: none;
  color: var(--text-title);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.625rem;
`;

const BlogTitle = ({ isRoot }) => {
  return isRoot ? (
    <h1
      style={{
        ...scale(1),
        marginBottom: 0,
        marginTop: 0,
      }}
    >
      <HomeLink>{config.title}</HomeLink>
    </h1>
  ) : (
    <h3
      style={{
        fontFamily: 'sans-serif',
        marginTop: 0,
        marginBottom: rhythm(-1),
      }}
    >
      <HomeLink>{config.title}</HomeLink>
    </h3>
  );
};

const Layout = ({ children }) => {
  let rootPath = '/';
  if (typeof __PATH_PREFIX__ !== 'undefined') {
    rootPath = __PATH_PREFIX__ + `/`;
  }
  const isRoot = true;

  const Container = isRoot ? Home : Detail;
  return (
    <Container>
      <Header>
        <BlogTitle isRoot={isRoot} />
      </Header>
      {isRoot && <Bio />}
      {children}
    </Container>
  );
};

Layout.getInitialProps = async (ctx) => {
  console.log(ctx);
  return {};
};

export default Layout;
