import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('<Button /> should render its children', () => {
  const buttonText = 'BUTTON_TEXT';
  render(<Button>{buttonText}</Button>);

  expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
});

test('<Button /> should render props', () => {
  render(<Button disabled type="submit"></Button>);
  const button = screen.getByRole('button');
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute('type', 'submit');
});
