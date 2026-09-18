jest.useFakeTimers();

/*jest.mock('swiper/element/bundle', () => ({
  register: jest.fn(),
}));*/

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
