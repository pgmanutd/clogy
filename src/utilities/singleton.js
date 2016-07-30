let instance;

// I prefer default export rather than named export
export default {
  getInstance
};

////////////////////////

function createInstance(originalInstance) {
  return Object.getPrototypeOf(Object.getPrototypeOf(originalInstance));
}

function getInstance(originalInstance) {
  // No need to go deep into proto chain again
  if (!instance) {
    instance = createInstance(originalInstance);
  }
  return instance;
}
