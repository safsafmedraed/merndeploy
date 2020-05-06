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
    {
      name: 'Quizz Management',
      icon: 'cui-people',
      attributes: { disabled: false },
      children: [
        {
          name: 'Add a question',
          url: '/Question',
          icon: 'icon-cursor',

        },
        {
          name: 'All Questions',
          url: '/ManageQuestions',
          icon: 'icon-star'
        },
        {
          name: 'Add a quizz',
          url: '/AddQuizz',
          icon: 'icon-star'
        },
        {
          name : 'view Quizz scores',
          url : 'TeacherAnswers',
          icon : 'icon-star'
        }
      ]
    },
    {
      name: 'Claims',
      url: '/Userclaims',
      icon: 'cui-envelope-open',
    }

  ],

};
