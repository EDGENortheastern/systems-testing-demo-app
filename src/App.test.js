import { render, screen } from '@testing-library/react';
import App from './App';

test("initial inputs are empty", ()=>{
  render(<App/>);
  const emailInput = screen.getByRole('textbox');
  // we need a more unique way to get password box
  // there is no role password
  const passInput = screen.getByLabelText("Password");
  const confirmInput = screen.getByLabelText(/confirm password/i);
  expect(emailInput.value).toBe('');
  expect(passInput.value).toBe('');
})