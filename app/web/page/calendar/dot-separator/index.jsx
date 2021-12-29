import React from 'react'
import classNames  from 'classnames'
import styles from './index.module.scss'

const DotSeparator = ({
  size,
  color
}) => {
  return (
    <div
      className={classNames(['global-dot-separator', styles.dot])}
      style={{ width: size, height: size, '--color': color }}
    ></div>
  )
}

export default DotSeparator