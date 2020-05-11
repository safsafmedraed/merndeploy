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

      ]
    },
    {
      name: 'Manage classes',
      icon: 'cui-people',
      attributes: { disabled: false },
      children: [
        {
          name: 'Add class',
          url: '/Addclass',
          icon: 'icon-star',
        },
        {
          name: 'List Classes',
          url: '/Listclasses',
          icon: 'icon-star',
        },
        {
          name: 'Affect Students',
          url: '/AffectSC',
          icon: 'icon-star',
        },
        {
          name: 'Affect Teacher',
          url: '/AffectST',
          icon: 'icon-star',
        },
        {
          name: 'Affect module',
          url: '/AffectTM',
          icon: 'icon-star',

        },
        {
          name: 'Claims',
          url: '/claims',
          icon: 'cui-envelope-open',
        }
      ]
    },

  ],

};
