import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AddLesson from './AddLesson';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AddLesson/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
