import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import QuizzAnswer from './QuizzAnswer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><QuizzAnswer/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
