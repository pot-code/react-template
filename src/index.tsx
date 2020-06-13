import React from 'react'
import ReactDom from 'react-dom'

import App from './app'
import serve from './mock/'

import './styles/index.css'

if (process.env.NODE_ENV === 'development') {
  serve()
}

ReactDom.render(<App />, document.querySelector('#root'))
