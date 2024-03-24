import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders header icon', () => {
  render(<App />)
  const imgElement = screen.getByAltText('dragon icon')
  expect(imgElement).toBeInTheDocument()
})
