import styled from 'styled-components';

const Home = styled.div`
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

const Detail = styled.div`
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
