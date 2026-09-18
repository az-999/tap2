import NPprogress from 'nprogress';

const nprogressInstance = NPprogress.configure({
  showSpinner: false,
  speed: 500,
  easing: 'ease',
});

export default nprogressInstance;
