import exampleView from '../../src/views/example.view.js';

describe('Example View', () => {
  const data = {
    geeks: 'Geeks',
  };
  it('Returns correct HTML', () => {
    expect(exampleView(data)).toBe(`
    <!doctype html>
        <html>
        <head>
            <title>Hello</title>
        </head>
        <body>
            Hello Geeks!
        </body>
        </html>
    `);
  });
});
