import React from 'react'
import styles from './index.module.scss'

const DotSeparator = ({
  size,
  color
}) => {
  return (
    <div className={styles.dot} style={{ width: size, '--color': color }}></div>
  )
}

export default DotSeparator