import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { rhythm } from './utils/typography';

const PostContainer = styled.section`
  color: var(--textNormal);
  background: var(--bg);
  transition: color 0.3s ease-out, background 0.3s ease-out;
  min-height: 100vh;
  margin: 0 auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`;

const Layout = ({ location, children }) => {
  return (
    <TransitionGroup component={null}>
      <CSSTransition timeout={400} key={location.pathname} classNames="page">
        <PostContainer>{children}</PostContainer>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Layout;
