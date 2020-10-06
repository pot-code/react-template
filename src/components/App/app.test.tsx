import React from 'react'
import { render, cleanup } from '@testing-library/react'

import serve from '@src/mock'
import App from './app'

beforeEach(() => {
  serve()
})

afterEach(cleanup)

it('App crashing', () => {
  render(<App />)
})
