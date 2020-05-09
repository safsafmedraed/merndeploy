import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AddQuestiontoL from './AddLAddQuestiontoLesson';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AddQuestiontoL/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
