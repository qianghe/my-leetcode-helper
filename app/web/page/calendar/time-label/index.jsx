import React from 'react'
import styles from './index.module.scss'

const TimeLabel = ({ time }) => {
  const hasYear = time.length >= 2

  return (
    <div className={styles.timeLabel}>
      {
        hasYear ? <p>{times[0]}年</p> : ''
      }
      <p>${times[0]}月</p>
    </div>
  )
}

export default TimeLabel