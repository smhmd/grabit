import React from 'react';
import { render } from '../../test-utils';
import RequestModal from '../User/RequestModal';

test('<RequestModal /> should not renders on /', () => {
  const { baseElement } = render(<RequestModal />);
  expect(baseElement.outerHTML).toBe('<body><div></div></body>');
});

test('<RequestModal /> should not renders on /request/random', () => {
  const { baseElement } = render(<RequestModal />, { path: '/request/random' });
  expect(baseElement.outerHTML).toBe('<body><div></div></body>');
});
