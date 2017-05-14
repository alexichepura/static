import * as React from 'react'
import { Hero } from './Hero'

export class Main extends React.Component<{}, {}> {
  render() {
    return <div className="main">
      <Hero />
    </div>
  }
}
