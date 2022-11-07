// eslint-disable-next-line import/no-unresolved
import { jest } from '@jest/globals';

it('console logs', async () => {
  console.log = jest.fn(console.log);
  await import('../../public/example.js');
  expect(console.log).toHaveBeenCalledWith('Example.js');
});
