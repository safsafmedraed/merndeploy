import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import DetailsTeacherAnswers from './DetailsTeacherAnswers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><DetailsTeacherAnswers/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
