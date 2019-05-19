import styled from 'styled-components';

const Home = styled.div`
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  .page-enter & {
    opacity: 0;
    transform: translateX(-100%);
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
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  .page-enter & {
    transform: translateX(100%);
  }
  .page-enter-active & {
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
