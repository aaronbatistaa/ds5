import utils from './utils.js';

const App = (() => {
  const htmlElements = {
    generate: document.querySelector('#generate'),
  };
  const handlers = {};
  const bindEvents = () => {
    console.log('Bind events...');
  };
  return {
    init() {
      bindEvents();
    }
  }
})();

console.log({ test: utils.testing });