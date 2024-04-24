import React from 'react';
import { render } from '@testing-library/react';
import FlashcardList from '../FlashcardList.js';

describe('FlashcardList Component', () => {
  test('renders a list of flashcards', () => {
    const flashcards = [
      { id: 1, spanish: 'Hola', english: 'Hello' },
      { id: 2, spanish: 'Adiós', english: 'Goodbye' },
    ];

    const { getAllByTestId } = render(<FlashcardList flashcards={flashcards} />);
    const flashcardElements = getAllByTestId('flashcard');

    expect(flashcardElements).toHaveLength(flashcards.length);
  });

  test('renders no flashcards when given an empty array', () => {
    const { queryByTestId } = render(<FlashcardList flashcards={[]} />);
    const flashcardElement = queryByTestId('flashcard');

    expect(flashcardElement).toBeNull();
  });
});