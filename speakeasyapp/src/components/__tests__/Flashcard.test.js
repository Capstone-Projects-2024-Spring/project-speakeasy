import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Flashcard from '../Flashcard.js';
import '@testing-library/jest-dom';


describe('Flashcard Component', () => {
  const flashcard = {
    spanish: 'Hola',
    english: 'Hello'
  };

  test('renders Spanish word on the front', () => {w
    const { getByText } = render(<Flashcard flashcard={flashcard} />);
    expect(getByText('Hola')).toBeInTheDocument();
  });

  test('renders English word on the back', () => {
    const { getByText } = render(<Flashcard flashcard={flashcard} />);
    fireEvent.click(getByText('Hola')); // Flip the card
    expect(getByText('Hello')).toBeInTheDocument();
  });

  test('flips the card when clicked', () => {
    const { getByText, container } = render(<Flashcard flashcard={flashcard} />);
    fireEvent.click(container.querySelector('.card'));
    expect(getByText('Hello')).toBeInTheDocument();
  });

  test('correctly adjusts height based on content', () => {
    const { getByTestId } = render(<Flashcard flashcard={flashcard} />);
    const cardElement = getByTestId('flashcard');
    const frontElement = cardElement.querySelector('.front');
    const backElement = cardElement.querySelector('.back');
  
    // Trigger a resize event to update the height
    fireEvent(window, new Event('resize'));
  
    // Wait for the height to be updated
    setTimeout(() => {
      const frontHeight = frontElement.getBoundingClientRect().height;
      const backHeight = backElement.getBoundingClientRect().height;
      const cardHeight = cardElement.getBoundingClientRect().height;
  
      expect(cardHeight).toBeGreaterThanOrEqual(frontHeight);
      expect(cardHeight).toBeGreaterThanOrEqual(backHeight);
      expect(cardHeight).toBeGreaterThanOrEqual(100); // Minimum height check
    }, 0);
  });
});
