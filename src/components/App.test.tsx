import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the hero heading', () => {
    render(<App />);
    expect(screen.getByText(/Workers Got/)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<App />);
    expect(screen.getAllByText('Data').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Stories')).toBeInTheDocument();
    expect(screen.getByText('Legislation')).toBeInTheDocument();
    expect(screen.getByText('Impact')).toBeInTheDocument();
    expect(screen.getByText('Act')).toBeInTheDocument();
  });

  it('renders the company dashboard section', () => {
    render(<App />);
    expect(screen.getByText('Follow the Money')).toBeInTheDocument();
  });

  it('renders the tax calculator section', () => {
    render(<App />);
    expect(screen.getByText('What If We Taxed the Bots?')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<App />);
    expect(screen.getByText(/All data is illustrative/)).toBeInTheDocument();
  });
});
