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

test("an error message is shown when the user types invalid email", () => {
  render(<App />);
  let emailError = screen.queryByText(/invalid email/i);
  const emailInput = screen.getByRole('textbox', {name: /email/i});
  const submitBut = screen.getByRole('button', {name: /submit/i});
  expect(emailError).not.toBeInTheDocument();
  userEvent.type(emailInput, 'katianchcom');
  userEvent.click(submitBut);
  emailError = screen.queryByText(/invalid email/i); // reassign after error
  expect(emailError).toBeInTheDocument();
});

test("length check for password", () => {
  render(<App />);
  const emailInput = screen.getByRole('textbox', {name: /email/i});
  let passError = screen.queryByText(
    /the password should be longer than 5 characters/i
  );
  const passInput = screen.getByLabelText("Password");
  const submitBut = screen.getByRole('button', {name: /submit/i});
  userEvent.type(emailInput, 'katia@nch.org');
  expect(passError).not.toBeInTheDocument();
  userEvent.type(passInput, '123');
  userEvent.click(submitBut);
  passError = screen.queryByText(
    /the password should be longer than 4 characters/i
  );
  expect(passError).toBeInTheDocument();
});

test("password and confirm password match", () => {
  render(<App />);
  const emailInput = screen.getByRole('textbox', {name: /email/i});
  let confirmError = screen.queryByText(
    /the password does not match. try again/i
  );
  const passInput = screen.getByLabelText("Password");
  const submitBut = screen.getByRole('button', {name: /submit/i});
  const confirmInput = screen.getByLabelText(/confirm password/i);
  userEvent.type(emailInput, 'katia@nch.org');
  userEvent.type(passInput, '12345');
  expect(confirmError).not.toBeInTheDocument();
  userEvent.type(confirmInput, '123456');
  userEvent.click(submitBut);
  confirmError = screen.queryByText(
    /the password does not match. try again/i
  );
  expect(confirmError).toBeInTheDocument();
});

test("when passwords match and validate and so does the email", () => {
  render(<App />);
  const emailInput = screen.getByRole('textbox', {name: /email/i});
  const passInput = screen.getByLabelText("Password");
  const confirmInput = screen.getByLabelText(/confirm password/i);
  const submitBut = screen.getByRole('button', {name: /submit/i});
  const emailError = screen.queryByText(/invalid email/i);
  const passError = screen.queryByText(
    /the password should be longer than 5 characters/i
  );
  const confirmError = screen.queryByText(
    /the password does not match. try again/i
  );
  userEvent.type(emailInput, 'katia@nch.org');
  userEvent.type(passInput, '12345');
  userEvent.type(confirmInput, '12345');
  userEvent.click(submitBut);
  expect(emailError).not.toBeInTheDocument();
  expect(passError).not.toBeInTheDocument();
  expect(confirmError).not.toBeInTheDocument();
})