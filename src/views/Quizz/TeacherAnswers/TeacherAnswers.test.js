import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TeacherAnswers from './TeacherAnswers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><TeacherAnswers/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
