import config from '../config/config.js';

const servicesHost = config.get('servicesHostname');

const basepath = 'http://localhost:8080/frontpage-case'; // Kan dette hentes fra config isteden?

export default function renderPreview({ publication }) {
  return `
    <!doctype html>
    <html>
    <head>
        <title>Preview</title>
        <script type="module" src="https://assets.acdn.no/pkg/@amedia/component-include/v2/include.js"></script>
    </head>
    <body>
        <!-- Parameter til komponenten sendes inn som attributter med prefix param -->
        <amedia-include param-publication="${publication}" manifest="https://${servicesHost}/api/brandheader/v1/components/header/${publication}/manifest/"></amedia-include>
        <amedia-include param-publication="${publication}" manifest="${basepath}/manifest"></amedia-include>
    </body>
    </html>
    `;
}
