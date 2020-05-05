import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import DetailsQuestion from './DetailsQuestion';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><DetailsQuestion/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
