import * as React from 'react'
import { Hero } from './Hero'
import { Users } from './Users'

export class Main extends React.Component<{}, {}> {
  render() {
    return <div className="main">
      <Hero />
      <Users />
    </div>
  }
}
