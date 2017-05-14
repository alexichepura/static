import * as React from 'react'
const styles = require('./styles/Hero.css')

export class Hero extends React.Component<{}, {}> {
  render() {
    return <div className={styles.hero} />
  }
}
