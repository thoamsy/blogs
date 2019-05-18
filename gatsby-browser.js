import 'lazysizes';

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(`博客有更新，是否刷新？`);

  if (answer) {
    window.location.reload();
  }
};
