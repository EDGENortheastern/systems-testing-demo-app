import { render, screen } from '@testing-library/react';
import App from './App';

test("initial inputs are empty", ()=>{
  render(<App/>);
  const emailInput = screen.getByRole('textbox');
  // there is no role called password
  const passInput = screen.getByLabelText(/password/i);
  expect(emailInput.value).toBe('');
  expect(passInput.value).toBe('');
})