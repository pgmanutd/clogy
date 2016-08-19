let instance;

// I prefer default export rather than named export
export default {
  getInstance
};

////////////////////////

function createInstance(originalInstance) {
  // Cached lookup once
  const proto = Object.getPrototypeOf;

  return proto(proto(originalInstance));
}

function getInstance(originalInstance) {
  // No need to go deep into prototype chain again
  if (!instance) {
    instance = createInstance(originalInstance);
  }

  return instance;
}
