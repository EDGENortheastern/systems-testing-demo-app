import { render, screen } from '@testing-library/react';
import App from './App';

test("initial inputs are empty", ()=>{
  render(<App/>);
  const emailInput = screen.getByRole('textbox');
  expect(emailInput.value).toBe('');
})