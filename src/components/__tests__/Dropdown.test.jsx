import React, { useState } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Dropdown from '../Dropdown';

afterEach(cleanup);

function DropdownTest({ initialState = false, ...props }) {
  const [isDropdownOpen, setDropdownOpen] = useState(initialState);
  return (
    <Dropdown
      isDropdownOpen={isDropdownOpen}
      setDropdownOpen={setDropdownOpen}
      {...props}
    ></Dropdown>
  );
}

test('<Dropdown /> should render only two first children when open', () => {
  render(
    <DropdownTest initialState={true}>
      <span data-testid="child-1" />
      <span data-testid="child-2" />
      <span data-testid="child-3" />
    </DropdownTest>,
  );
  expect(screen.getByTestId('child-1')).toBeInTheDocument();
  expect(screen.queryByTestId('child-2')).toBeInTheDocument();
  expect(screen.queryByTestId('child-3')).not.toBeInTheDocument();
});

test('<Dropdown /> should open on button click', () => {
  const buttonText = 'click me';
  render(
    <DropdownTest>
      <span>{buttonText}</span>
      <span></span>
    </DropdownTest>,
  );

  const dropdownButton = screen.getByRole('button', { name: buttonText });

  expect(screen.queryByTestId('dropdown-content')).not.toBeInTheDocument();
  userEvent.click(dropdownButton);
  expect(screen.queryByTestId('dropdown-content')).toBeInTheDocument();
});

test('<Dropdown /> should close on click outside', () => {
  render(<DropdownTest initialState={true}>{''}</DropdownTest>);

  const dropdownOverlayButton = screen.getByTestId('dropdown-overlay-button');

  expect(screen.queryByTestId('dropdown-content')).toBeInTheDocument();
  userEvent.click(dropdownOverlayButton);
  expect(screen.queryByTestId('dropdown-content')).not.toBeInTheDocument();
});
