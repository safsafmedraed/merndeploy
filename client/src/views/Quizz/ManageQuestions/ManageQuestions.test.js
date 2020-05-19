import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ManageQuestions from './ManageQuestions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ManageQuestions/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
