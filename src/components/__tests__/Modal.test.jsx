import React from 'react';
import { render, cleanup, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';

import Modal from '../Modal';

afterEach(cleanup);

test('<Modal /> should not render', () => {
  const modalRoute = '/modal';
  const differentRoute = '/';
  if (modalRoute === differentRoute)
    throw new Error('modalPath and route should be different for this test');

  const { baseElement } = render(<Modal path={modalRoute} title="My test" />, {
    path: differentRoute,
  });
  expect(baseElement.outerHTML).toBe('<body><div></div></body>');
});

test('<Modal /> should hide on overlay click', () => {
  const modalRoute = '/modal';

  const { baseElement } = render(<Modal path="/modal" />, { path: modalRoute });

  expect(baseElement.outerHTML).not.toBe('<body><div></div></body>');

  const overlay = screen.getByTestId('overlay');
  userEvent.click(overlay);
  expect(baseElement.outerHTML).toBe('<body><div></div></body>');
});
