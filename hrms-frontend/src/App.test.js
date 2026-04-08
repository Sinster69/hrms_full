import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard heading', async () => {
  render(<App />);
  const headingElement = await screen.findByText(/your focus/i);
  expect(headingElement).toBeInTheDocument();
});
