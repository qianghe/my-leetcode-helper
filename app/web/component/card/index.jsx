import React from 'react'
import styles from './index.module.scss'

const Card = ({
  corner = 5,
  title = '',
  level = 1,
  children = []
}) => {
  const divStyles = {
    borderTopLeftRadius: corner
  }

  return (
    <div className={styles.card} style={divStyles}>
      <p style={{ '--level': level }} className={styles.title}>{title}</p>
      {children}
    </div>
  )
}
export default Card