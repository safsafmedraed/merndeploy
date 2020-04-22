export default {

  items: [
    {

      name: 'Teacher Space',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Features',
      wrapper: {
        element: '',
        attributes: {},
      }
    }, {
      name: 'Forum',
      icon: 'cui-people',
      attributes: { disabled: false },
      children: [
        {
          name: 'Join Qwizard community chat',
          url: '/Join',
          icon: 'icon-cursor',
          badge: {
            variant: 'info',
            text: 'Real time Messages',
          },
        },
        {
          name: 'All Q & A',
          url: '/Forum',
          icon: 'icon-star'
        }
      ]
    },

  ],

};
