import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AddModule from './AddModule';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AddModule/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
