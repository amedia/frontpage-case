// Et fungerende manifest, men du har lov til å endre om du trenger det
export default {
  manifestVersion: '2.0.0',
  provider: {
    id: 'amedia'
  },
  component: {
    id: 'frontpage-case-component',
    version: '1.0.0',
    title: 'Frontpage Case Component',
    description: 'This component displays a frontpage',
    platform: [
      'web',
      'mobile'
    ],
    tags: [],
    markup: {
      urlTemplate: 'http://localhost:8080/frontpage-case/component', // Kan host byttes ut med en verdi fra config? Hvorfor ønsker man å gjøre det?
      queryParameters: [
        {
          name: 'publication',
          description: 'The publication we want to display. ',
          example: 'www.dt.no',
          optional: false,
          format: 'publication'
        },
        {
          name: 'count',
          description: 'Number of teasers displayed on the frontpage',
          example: '10',
          optional: true
        }
      ]
    },
    resources: {
      css: [
        'http://localhost:8080/frontpage-case/assets/style.css' // Kan host byttes ut med en verdi fra config?
      ],
      js: [
        'http://localhost:8080/frontpage-case/assets/script.js' // Kan host byttes ut med en verdi fra config?
      ]
    },
  }
};