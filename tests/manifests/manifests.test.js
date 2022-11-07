import manifests from '../../src/manifests/manifests.js';

describe('Manifests', () => {
  it('creates an object of all manifests', () => {
    expect(typeof manifests).toBe('object');
  });
  // TODO: Add more tests
});
