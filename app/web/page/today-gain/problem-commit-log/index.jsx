import React, { useMemo } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { float2Percent } from 'app/web/utils/convert'
import { cateColorMap } from 'app/web/utils/color'

import styles from './index.module.scss'

const log1 = [1641011594, 1641012941, 1641014277].map((t, index) => ({
  problemId: 1,
  timestamp: t,
  cate: 'hard',
  status: index === 2 ? 'accepted': 'wrong',
}))

const log2 = [1641015866, 1641016061, 1641017339, 1641017833, 1641018613, 1641019093, 1641019189].map((t, index) => ({
  problemId: 2,
  timestamp: t,
  cate: 'medium',
  status: index === 6 ? 'accepted': 'wrong',
}))

const log3 = [1641020449, 1641020700, 1641020892].map((t, index) => ({
  problemId: 3,
  timestamp: t,
  cate: 'easy',
  status: index !== 0 ? 'accepted': 'wrong',
}))

const logMockData = [
  ...log1,
  ...log2,
  ...log3
]

function ProblemCommitLog({
  logs = logMockData
} = {
  logs: logMockData
}) {
  const [min, max] = useMemo(() => {
    const times = logs.map(log => log.timestamp)
    return [
      Math.min(...times),
      Math.max(...times),
    ]
  }, [logs])

  const logsPositionX = useMemo(() => {
    return logs.reduce((positionLocs, log, index) => {
      const { timestamp } = log
      const rel = (timestamp - min) / (max - min)
      positionLocs[index] = float2Percent(rel)
      
      return positionLocs
    }, [])
  }, [logs])

  const times = [min, max].map((timestamp) => {
    return moment(timestamp * 1000).format('MM.DD/A HH:mm').split('/')
  })

  return (
    <div className={styles.commitLogs}>
      <div className={classNames(styles.timeLabel, styles['timeLabel--head'])}>
        <span>{times[0][0]}</span>
        <span>{times[0][1]}</span>
      </div>
      {
        logs.map((log, index) => {
          const { cate, status } = log
          return (
            <div 
              key={index}
              className={classNames(styles.log, styles[`log--${status}`])}
              style={{  
                left: logsPositionX[index],
                backgroundColor: status === 'wrong' ? 'transparent' : cateColorMap[cate]
              }}
            ></div>
          )
        })
      }
      <div className={classNames(styles.timeLabel, styles['timeLabel--tail'])}>
        <span>{times[1][0]}</span>
        <span>{times[1][1]}</span>
      </div>
    </div>
  )
}

export default ProblemCommitLog