/* @flow */

import type { ClogyType } from '../globalFlowTypes';

let instance: ClogyType;

// I prefer default export rather than named export
export default {
  getInstance
};

////////////////////////

/**
 * Creates new instance from Clogy's parent i.e. Logger (a copy of parent)
 * @param  {ClogyType} originalInstance: clogy's instance
 * @returns {ClogyType} Returns a copy of parent
 */
function createInstance(originalInstance: ClogyType): Object {
  // Cached lookup once
  const proto = Object.getPrototypeOf;

  return proto(proto(originalInstance));
}

/**
 * Get cached instance
 * @param  {ClogyType} originalInstance: clogy's instance
 * @returns {ClogyType} Returns a copy of parent (cached)
 */
function getInstance(originalInstance: ClogyType): Object {
  // No need to go deep into prototype chain again
  if (!instance) {
    instance = createInstance(originalInstance);
  }

  return instance;
}
