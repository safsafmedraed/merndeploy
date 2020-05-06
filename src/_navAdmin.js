export default {

  items: [
    {
      name: 'Admin Panel',
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
    },
    {
      name: 'AdminPanel',
      icon: 'cui-people',
      attributes: { disabled: false },
      children: [
        {
          name: 'All Users Profiles',
          url: '/Profiles',
          icon: 'icon-star'
        },
        {
          name: 'Manage classes',
          url: '/Classes',
          icon: 'icon-star',

        },
        {
          name: 'Claims',
          url: '/claims',
          icon: 'icon-star',

        }
      ]
    },

  ],

};
