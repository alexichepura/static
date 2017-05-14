import * as React from 'react'
const styles = require('./styles/Hero.css')

export class Hero extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h3 className={styles.heroTitle}>Hero Title</h3>
        <div className={styles.hero} />
      </div>
    )
  }
}
