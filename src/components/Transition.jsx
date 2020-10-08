import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { rhythm } from '../utils/typography';

const PostContainer = styled.section`
  color: var(--text-normal);
  background: var(--system-background-primary);
  transition: color 0.3s ease-out, background 0.3s ease-out;
  min-height: 100vh;
  margin: 0 auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`;

const Layout = ({ children, pathname }) => {
  return (
    <TransitionGroup component={null}>
      <CSSTransition timeout={400} key={pathname} classNames="page">
        <PostContainer>{children}</PostContainer>
      </CSSTransition>
    </TransitionGroup>
  );
};

const Home = styled(Layout).attrs({ pathname: 'home' })`
  .page-enter & {
    opacity: 0;
    transform: translateX(-100%);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .page-enter-active & {
    opacity: 1;
    transform: translateX(0);
  }
  .page-exit & {
    opacity: 1;
    transform: translateX(0);
  }
  .page-exit-active & {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

const Detail = styled(Layout).attrs({ pathname: 'detail' })`
  .page-enter & {
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .page-enter-active & {
    opacity: 1;
    transform: translateX(0);
  }

  .page-exit & {
    transform: translateX(0);
    opacity: 1;
  }
  .page-exit-active & {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export { Home, Detail };
