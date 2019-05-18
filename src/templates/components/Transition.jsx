import styled, { keyframes, css } from 'styled-components';

const homeSlideIn = keyframes`
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;
const homeSlideOut = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(-100%, 0, 0);
  }
`;

const detailSlideIn = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const detailSlideOut = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
  }
`;

const slideAnimationWith = animationName => () => {
  return css`
    ${animationName} 0.3s forwards;
  `;
  // return props.isRoot
  //   ? css`
  //       .page-enter {
  //         animation: ${homeSlideIn} 0.3s forwards;
  //       }
  //       .page-exit {
  //         animation: ${homeSlideOut} 0s forwards;
  //       }
  //     `
  //   : css`
  //       .page-enter {
  //         animation: ${detailSlideIn} 0.3s forwards;
  //       }

  //       .page-exit {
  //         animation: ${detailSlideOut} 0.3s forwards;
  //       }
  //     `;
};

const PostContainer = styled.section`
  color: var(--textNormal);
  background: var(--bg);
  transition: color 0.3s ease-out, background 0.3s ease-out;
  min-height: 100vh;

  /* &.page-enter {
    ${props => {
      return (
        'animation: ' +
        (props.isRoot
          ? slideAnimationWith(homeSlideIn)
          : slideAnimationWith(detailSlideIn))
      );
    }}
  }
  &.page-exit {
    ${props =>
      'animation: ' +
      (props.isRoot
        ? slideAnimationWith(homeSlideOut)
        : slideAnimationWith(detailSlideOut))}
  } */
`;

const Home = styled.div`
  &.page-enter {
    animation: ${homeSlideIn} 0.3s forwards;
  }
  &.page-exit {
    animation: ${homeSlideOut} 0.3s forwards;
  }
`;

const Detail = styled.div`
  &.page-enter {
    animation: ${detailSlideIn} 0.3s forwards;
  }
  &.page-exit {
    animation: ${detailSlideOut} 0.3s forwards;
  }
`;

export { Home, Detail };
