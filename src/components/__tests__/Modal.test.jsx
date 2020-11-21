import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Modal from '../Modal';

afterEach(cleanup);

test('<Modal />', () => {
  render(
    <MemoryRouter>
      <Modal path="/" title="My test" />
    </MemoryRouter>,
  );
});
