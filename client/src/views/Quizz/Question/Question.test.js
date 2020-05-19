import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Question from './Question';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Question/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
