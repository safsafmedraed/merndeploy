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
          name: 'Add New Post',
          url: '/AddPost',
          icon: 'icon-cursor',

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
