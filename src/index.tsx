require('./styles/index.css')

import * as React from 'react'
import { render } from 'react-dom'
import { App } from './components/App'

const appNode = document.getElementById('app')
const m = module as any

if (m.hot) {
  // Hot Module Reload in development

  const { AppContainer } = require('react-hot-loader')
  // hack to not use redbox-react to show errors
  // https://github.com/gaearon/react-hot-loader/issues/462
  delete AppContainer.prototype.unstable_handleError

  const appRender = Component => {
    render(
      <AppContainer>
        <Component />
      </AppContainer>,
      appNode
    )
  }

  appRender(App);

  m.hot.accept('./components/App', () => {
    const App = require('./components/App').App
    appRender(App)
  })
} else {
  render(<App />, appNode)
}
