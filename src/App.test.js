import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test("initial inputs are empty", ()=>{
  render(<App/>);
  const emailInput = screen.getByRole('textbox');
  // we need a more unique way to get password box
  // there is no role password
  const passInput = screen.getByLabelText("Password");
  // the regex for /password/i returns >1 elelment and fails byRole
  const confirmInput = screen.getByLabelText(/confirm password/i);
  expect(emailInput.value).toBe('');
  expect(passInput.value).toBe('');
  expect(confirmInput.value).toBe('');
});

test("that the user can type an email", () => {
  render(<App/>);
  const emailInput = screen.getByRole('textbox', {name: /email/i});
  userEvent.type(emailInput, 'katia@nch.org');
  expect(emailInput.value).toBe('katia@nch.org');
});

test("that user can type a password", () => {
  render(<App/>);
  const passInput = screen.getByLabelText("Password");
  userEvent.type(passInput, 'password123!');
  expect(passInput.value).toBe('password123!');
});

test("that user can type a confirmed password", () => {
  render(<App/>);
  const confirmedInput = screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmedInput, 'password123!');
  expect(confirmedInput.value).toBe('password123!');
});