import React from 'React';
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
import Input from '../client/components/Input';
import '@testing-library/jest-dom'

describe('Unit testing React button', () => {

describe('Input', () => {
    let text;  
    beforeAll(() => {
      text = render(<Input/>)
    });

    test('Renders the "Send Message" button', () => {
        const buttons = screen.getAllByRole('button');
        expect(buttons.some((button) => button.id === 'input')).toBeTruthy();
    });

  })})