import React, { useMemo } from 'react'
import Card from 'web/component/card'
import styles from './index.module.scss'

const mockData = [
  {
    time: 1644508800000,
    hard: 9,
    medium: 10,
    esay: 6
  },
  {
    time: 1640966400000,
    hard: 2,
    medium: 32,
    esay: 10
  }, {
    time: 1639152000000,
    hard: 0,
    medium: 34,
    esay: 2
  },
  {
    time: 1636560000000,
    hard: 0,
    medium: 64,
    esay: 0
  }
]

const Calendar = () => {
  // 基于problems进行计算
  const cateByMonth = useMemo(() =>{
    return mockData
  }, [])

  return (
    <div className={styles.calendar}>
      <Card corner={30}>
        <div className={styles.header}>
          <p>日历</p>
        </div>
      </Card>
    </div>
  )
}

export default Calendar