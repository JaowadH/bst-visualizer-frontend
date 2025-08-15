// src/pages/EnterNumbers.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import EnterNumbers from './EnterNumbers'

describe('EnterNumbers page', () => {
  it('renders the form', () => {
    render(
      <MemoryRouter>
        <EnterNumbers />
      </MemoryRouter>
    )
    expect(screen.getByText(/Enter Numbers/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })
})
