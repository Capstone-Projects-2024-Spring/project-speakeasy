import React from 'react';
import { render } from '@testing-library/react';
import About from '../About.js'; 
import '@testing-library/jest-dom'

describe('About Component', () => {
  test('renders all text content correctly', () => {
    const { getByText } = render(<About />);
    
    expect(getByText('Learn any language easily.')).toBeInTheDocument();
    expect(getByText('Chat naturally.')).toBeInTheDocument();
    expect(getByText('Anywhere really.')).toBeInTheDocument();
  });

  test('renders logo image correctly', () => {
    const { getByAltText } = render(<About />);
    
    expect(getByAltText('SpeakEasy')).toBeInTheDocument();
  });

  test('renders orange rectangle', () => {
    const { getByTestId } = render(<About />);
    
    expect(getByTestId('orange-rectangle')).toBeInTheDocument();
  });
});