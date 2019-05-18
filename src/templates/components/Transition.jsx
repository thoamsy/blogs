import styled, { keyframes } from 'styled-components';

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

const Home = styled.div`
  .page-enter & {
    animation: ${homeSlideIn} 0.4s forwards;
  }
  .page-exit & {
    animation: ${homeSlideOut} 0.4s forwards;
  }
`;

const Detail = styled.div`
  .page-enter & {
    animation: ${detailSlideIn} 0.4s forwards;
  }
  .page-exit & {
    animation: ${detailSlideOut} 0.4s forwards;
  }
`;

export { Home, Detail };
