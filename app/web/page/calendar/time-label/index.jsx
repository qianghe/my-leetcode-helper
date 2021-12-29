import React from 'react'
import styles from './index.module.scss'

const TimeLabel = ({ times }) => {
  const hasYear = times.length >= 2

  return (
    <div className={styles.timeLabel}>
      {
        hasYear ? <p>{times[0]}</p> : ''
      }
      <p>{hasYear ? times[1] : times[0]}月</p>
    </div>
  )
}

export default TimeLabel