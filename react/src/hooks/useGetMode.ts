export const useGetMode = () => {
  const isProdMode = process.env.REACT_APP_MODE === 'prod';
  const isStageMode = process.env.REACT_APP_MODE === 'stage';
  const isTestMode = process.env.REACT_APP_MODE === 'test';
  const isDevMode = process.env.REACT_APP_MODE === 'dev';

  return { isDevMode, isStageMode, isTestMode, isProdMode };
};
