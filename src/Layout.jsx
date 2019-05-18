import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Layout = ({ location, children }) => {
  return (
    <TransitionGroup component={null}>
      <CSSTransition timeout={300} key={location.pathname} classNames="page">
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Layout;
