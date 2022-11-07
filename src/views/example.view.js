import config from '../config/config.js';
const basepath = config.get('basePath');

export default function renderHelloWorld(data) {
  return `
    <!doctype html>
        <html>
        <head>
            <title>Hello</title>
            <link rel="stylesheet" href="${basepath}/assets/example.css">
            <script src="${basepath}/assets/example.js"></script>
        </head>
        <body>
            <h1>Hello ${data.geeks}!</h1>
        </body>
        </html>
    `;
}
